'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Share2, Facebook, Twitter, Pinterest, Link, Heart, MessageCircle } from "lucide-react";

// Mock data
const mockComments = [
  {
    id: '1',
    userName: 'Anna',
    userAvatar: '/avatars/anna.jpg',
    content: 'Dette navnet er så fint! Vi vurderte det til vår datter.',
    createdAt: new Date('2024-04-20'),
    likes: 5,
    replies: [
      {
        id: '1-1',
        userName: 'Maria',
        content: 'Ja, det er et veldig populært navn nå!',
        createdAt: new Date('2024-04-21'),
        likes: 2
      }
    ]
  },
  {
    id: '2',
    userName: 'Lars',
    userAvatar: '/avatars/lars.jpg',
    content: 'Har dere noen gode mellomnavn som passer til dette navnet?',
    createdAt: new Date('2024-04-19'),
    likes: 3,
    replies: []
  }
];

const mockDiscussions = [
  {
    id: '1',
    title: 'Hvilke navn går bra med Emma?',
    author: 'Sofia',
    createdAt: new Date('2024-04-22'),
    replies: 12,
    views: 45,
    tags: ['jentenavn', 'mellomnavn']
  },
  {
    id: '2',
    title: 'Nordiske guttenavn 2024',
    author: 'Erik',
    createdAt: new Date('2024-04-21'),
    replies: 8,
    views: 32,
    tags: ['guttenavn', 'nordisk']
  }
];

export default function SocialFeaturesPage() {
  const [newComment, setNewComment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Navnefellesskapet</h1>

      {/* Social Sharing Example */}
      <div className="mb-12 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Del navnet</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Facebook className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Twitter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Pinterest className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Link className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mb-12 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Kommentarer</h2>
        <div className="flex gap-4 mb-6">
          <Avatar>
            <AvatarFallback>DU</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Skriv din kommentar..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2"
            />
            <Button disabled={!newComment.trim()}>
              Legg til kommentar
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {mockComments.map((comment) => (
            <div key={comment.id} className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Avatar>
                  <AvatarFallback>{comment.userName.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{comment.userName}</div>
                  <div className="text-sm text-gray-500">
                    {comment.createdAt.toLocaleDateString('no-NO')}
                  </div>
                </div>
              </div>
              <p className="mb-2">{comment.content}</p>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4 mr-1" />
                  {comment.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Svar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Discussions */}
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Diskusjoner</h2>
          <Button>Start ny diskusjon</Button>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Søk i diskusjoner..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="popular">
          <TabsList>
            <TabsTrigger value="popular">Populære</TabsTrigger>
            <TabsTrigger value="recent">Nye</TabsTrigger>
            <TabsTrigger value="trending">Trendende</TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="mt-4">
            <div className="space-y-4">
              {mockDiscussions.map((discussion) => (
                <div key={discussion.id} className="border rounded-lg p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{discussion.title}</h3>
                      <div className="text-sm text-gray-500">
                        Av {discussion.author} • {discussion.createdAt.toLocaleDateString('no-NO')}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {discussion.replies} svar • {discussion.views} visninger
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {discussion.tags.map((tag) => (
                      <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 