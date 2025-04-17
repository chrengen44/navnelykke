import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Personvernserklæring</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Innledning</h2>
            <p>
              På Navnelykke tar vi personvern på alvor. Denne personvernserklæringen forklarer hvordan vi samler inn, bruker og beskytter dine personopplysninger når du bruker vår nettside.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Ansvarlig for behandling</h2>
            <p>
              Navnelykke er behandlingsansvarlig for behandlingen av dine personopplysninger. Kontaktinformasjon finner du nederst på siden.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Hvilke opplysninger samler vi inn?</h2>
            <p>
              Vi samler inn følgende typer informasjon:
            </p>
            <ul className="list-disc pl-4 mt-2">
              <li>Teknisk informasjon (IP-adresse, nettlesertype, enhetsinformasjon)</li>
              <li>Bruk av nettsiden (hvilke sider du besøker, hvor lenge du er på siden)</li>
              <li>Informasjon fra Google Analytics for å forbedre brukeropplevelsen</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Bruk av informasjonskapsler (cookies)</h2>
            <p>
              Vi bruker informasjonskapsler for å:
            </p>
            <ul className="list-disc pl-4 mt-2">
              <li>Forbedre brukeropplevelsen</li>
              <li>Analysere trafikk på nettsiden</li>
              <li>Vise relevante annonser gjennom Google AdSense</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Google AdSense</h2>
            <p>
              Vår nettside bruker Google AdSense for å vise annonser. Google AdSense bruker informasjonskapsler for å vise relevante annonser basert på dine tidligere besøk på vår og andre nettsteder. Du kan velge bort personlig tilpassede annonser i Google-innstillingene.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Dine rettigheter</h2>
            <p>
              Du har rett til:
            </p>
            <ul className="list-disc pl-4 mt-2">
              <li>Innsyn i dine personopplysninger</li>
              <li>Rettelse av feilaktige opplysninger</li>
              <li>Sletting av dine opplysninger</li>
              <li>Begrense behandlingen av dine opplysninger</li>
              <li>Dataportabilitet</li>
              <li>Å protestere mot behandlingen</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Kontakt oss</h2>
            <p>
              Hvis du har spørsmål om vår personvernserklæring eller ønsker å utøve dine rettigheter, kan du kontakte oss på:
            </p>
            <p className="mt-2">
              E-post: [din e-post]<br />
              Adresse: [din adresse]
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Endringer i personvernserklæringen</h2>
            <p>
              Vi forbeholder oss retten til å gjøre endringer i denne personvernserklæringen. Eventuelle endringer vil bli publisert på denne siden.
            </p>
            <p className="mt-2">
              Sist oppdatert: {new Date().toLocaleDateString('no-NO')}
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy; 