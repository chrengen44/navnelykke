
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose 
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { BabyName } from "@/data/types";
import { Pencil, Trash2, Plus } from "lucide-react";
import { fetchCategories } from "@/integrations/supabase/client";
import { NameCategory } from "@/data/types";

export const AdminPanel = () => {
  const [names, setNames] = useState<BabyName[]>([]);
  const [categories, setCategories] = useState<NameCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [nameDialogOpen, setNameDialogOpen] = useState(false);
  const [currentName, setCurrentName] = useState<Partial<BabyName> | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load categories
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
      
      // Load all names
      const { data, error } = await supabase
        .from('baby_names')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) throw error;
      
      // For each name, fetch its categories
      const namesWithCategories = await Promise.all(data.map(async (name) => {
        const { data: mappings, error: mappingsError } = await supabase
          .from('name_category_mappings')
          .select('name_categories(name)')
          .eq('name_id', name.id);
          
        if (mappingsError) throw mappingsError;
        
        const nameCategories = mappings.map(
          (mapping: any) => mapping.name_categories.name
        );
        
        return {
          ...name,
          categories: nameCategories,
          firstLetter: name.first_letter
        };
      }));
      
      setNames(namesWithCategories);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Feil ved lasting av data",
        description: "Kunne ikke laste navn og kategorier.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const openAddNameDialog = () => {
    setCurrentName({
      name: "",
      gender: "boy",
      origin: "",
      meaning: "",
      popularity: 50,
      length: "medium",
      categories: [],
      firstLetter: "",
    });
    setSelectedCategories([]);
    setIsEditing(false);
    setNameDialogOpen(true);
  };

  const openEditNameDialog = (name: BabyName) => {
    setCurrentName(name);
    setSelectedCategories(name.categories);
    setIsEditing(true);
    setNameDialogOpen(true);
  };

  const handleSaveName = async () => {
    if (!currentName || !currentName.name) return;
    
    try {
      // Make sure first letter is set
      const firstLetter = currentName.name.charAt(0).toUpperCase();
      
      if (isEditing && currentName.id) {
        // Update existing name
        const { error } = await supabase
          .from('baby_names')
          .update({
            name: currentName.name,
            gender: currentName.gender,
            origin: currentName.origin,
            meaning: currentName.meaning,
            popularity: currentName.popularity,
            length: currentName.length,
            first_letter: firstLetter,
          })
          .eq('id', currentName.id);
          
        if (error) throw error;
        
        // Update categories
        // First delete all existing mappings
        await supabase
          .from('name_category_mappings')
          .delete()
          .eq('name_id', currentName.id);
          
        // Add new mappings
        for (const categoryName of selectedCategories) {
          const category = categories.find(c => c.id === categoryName);
          if (category) {
            await supabase
              .from('name_category_mappings')
              .insert({
                name_id: currentName.id,
                category_id: parseInt(category.id)
              });
          }
        }
        
        toast({
          title: "Navnet oppdatert",
          description: `Navnet "${currentName.name}" ble oppdatert.`,
        });
      } else {
        // Insert new name
        const { data, error } = await supabase
          .from('baby_names')
          .insert({
            name: currentName.name,
            gender: currentName.gender,
            origin: currentName.origin,
            meaning: currentName.meaning,
            popularity: currentName.popularity || 50,
            length: currentName.length || 'medium',
            first_letter: firstLetter,
          })
          .select();
          
        if (error) throw error;
        
        const newNameId = data[0].id;
        
        // Add category mappings
        for (const categoryName of selectedCategories) {
          const category = categories.find(c => c.id === categoryName);
          if (category) {
            await supabase
              .from('name_category_mappings')
              .insert({
                name_id: newNameId,
                category_id: parseInt(category.id)
              });
          }
        }
        
        toast({
          title: "Navn lagt til",
          description: `Navnet "${currentName.name}" ble lagt til.`,
        });
      }
      
      // Reload data
      loadData();
      setNameDialogOpen(false);
    } catch (error) {
      console.error('Error saving name:', error);
      toast({
        title: "Feil ved lagring",
        description: "Kunne ikke lagre navnet.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteName = async (id: number) => {
    if (!confirm("Er du sikker på at du vil slette dette navnet?")) return;
    
    try {
      const { error } = await supabase
        .from('baby_names')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: "Navn slettet",
        description: "Navnet ble slettet fra databasen.",
      });
      
      // Reload data
      loadData();
    } catch (error) {
      console.error('Error deleting name:', error);
      toast({
        title: "Feil ved sletting",
        description: "Kunne ikke slette navnet.",
        variant: "destructive",
      });
    }
  };

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Administrer Babynavn</h2>
        <Button onClick={openAddNameDialog}>
          <Plus className="mr-2 h-4 w-4" /> Legg til navn
        </Button>
      </div>
      
      {loading ? (
        <div className="text-center py-8">Laster data...</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Navn</TableHead>
                <TableHead>Kjønn</TableHead>
                <TableHead>Opprinnelse</TableHead>
                <TableHead>Popularitet</TableHead>
                <TableHead>Handlinger</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {names.map((name) => (
                <TableRow key={name.id}>
                  <TableCell className="font-medium">{name.name}</TableCell>
                  <TableCell>
                    {name.gender === 'boy' ? 'Gutt' : 
                     name.gender === 'girl' ? 'Jente' : 'Unisex'}
                  </TableCell>
                  <TableCell>{name.origin}</TableCell>
                  <TableCell>{name.popularity}/100</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => openEditNameDialog(name)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteName(name.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      <Dialog open={nameDialogOpen} onOpenChange={setNameDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Rediger navn' : 'Legg til nytt navn'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Navn
                </label>
                <Input
                  id="name"
                  value={currentName?.name || ''}
                  onChange={(e) => setCurrentName({
                    ...currentName!,
                    name: e.target.value,
                    firstLetter: e.target.value.charAt(0).toUpperCase(),
                  })}
                />
              </div>
              
              <div>
                <label htmlFor="gender" className="block text-sm font-medium mb-1">
                  Kjønn
                </label>
                <Select
                  value={currentName?.gender || 'boy'}
                  onValueChange={(value) => setCurrentName({
                    ...currentName!,
                    gender: value as 'boy' | 'girl' | 'unisex',
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Velg kjønn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boy">Gutt</SelectItem>
                    <SelectItem value="girl">Jente</SelectItem>
                    <SelectItem value="unisex">Unisex</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label htmlFor="origin" className="block text-sm font-medium mb-1">
                Opprinnelse
              </label>
              <Input
                id="origin"
                value={currentName?.origin || ''}
                onChange={(e) => setCurrentName({
                  ...currentName!,
                  origin: e.target.value,
                })}
              />
            </div>
            
            <div>
              <label htmlFor="meaning" className="block text-sm font-medium mb-1">
                Betydning
              </label>
              <Textarea
                id="meaning"
                value={currentName?.meaning || ''}
                onChange={(e) => setCurrentName({
                  ...currentName!,
                  meaning: e.target.value,
                })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="popularity" className="block text-sm font-medium mb-1">
                  Popularitet (1-100)
                </label>
                <Input
                  id="popularity"
                  type="number"
                  min={1}
                  max={100}
                  value={currentName?.popularity || 50}
                  onChange={(e) => setCurrentName({
                    ...currentName!,
                    popularity: parseInt(e.target.value),
                  })}
                />
              </div>
              
              <div>
                <label htmlFor="length" className="block text-sm font-medium mb-1">
                  Lengde
                </label>
                <Select
                  value={currentName?.length || 'medium'}
                  onValueChange={(value) => setCurrentName({
                    ...currentName!,
                    length: value as 'short' | 'medium' | 'long',
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Velg lengde" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Kort</SelectItem>
                    <SelectItem value="medium">Middels</SelectItem>
                    <SelectItem value="long">Lang</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Kategorier
              </label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor={`category-${category.id}`} className="text-sm">
                      {category.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Avbryt</Button>
            </DialogClose>
            <Button onClick={handleSaveName}>
              {isEditing ? 'Oppdater' : 'Legg til'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
