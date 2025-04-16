
import { Layout } from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Om Navnelykke</h1>
          
          <div className="prose prose-pink lg:prose-lg">
            <p>
              Velkommen til Navnelykke! Vi er et norsk par som nylig ble foreldre for første gang, 
              og gjennom vår egen reise i jakt på det perfekte navnet til vårt barn, 
              oppdaget vi hvor utfordrende og samtidig spennende denne prosessen kan være.
            </p>
            
            <p>
              Det å velge navn til barnet ditt er en av de første og viktigste gavene du gir dem. 
              Det var overraskende for oss hvor mye tid vi brukte på å lete gjennom lister, 
              bøker og nettsider for å finne det rette navnet som hadde den perfekte betydningen, 
              klangen og som passet til vår familie.
            </p>
            
            <p>
              Etter mange timer med research og diskusjoner, bestemte vi oss for å skape Navnelykke 
              - en ressurs for andre foreldre som står i samme situasjon. Vi ønsket å lage en nettside 
              som ikke bare tilbyr lister med navn, men også inspirasjon, betydninger og historier 
              bak navnene, spesielt med fokus på norske og nordiske tradisjoner.
            </p>
            
            <p>
              Vårt mål er å gjøre prosessen med å velge navn til ditt barn både enklere og mer gledesfylt. 
              Vi håper at Navnelykke kan være et nyttig verktøy for deg på din reise som forelder, 
              og kanskje kan du finne den perfekte navnelykken til ditt barn her.
            </p>
            
            <p>
              Vi oppdaterer jevnlig siden med nye navn, kategorier og inspirasjon, 
              så kom gjerne tilbake ofte for å se hva som er nytt!
            </p>
            
            <p className="font-medium">
              Med vennlig hilsen,<br />
              Navnelykke-teamet
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
