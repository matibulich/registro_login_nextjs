import { HeroSection } from "@/components/ui/hero-section";
import { getHomePage } from "@/lib/strapi";


type Section = {
  __component: string;

}

export async function generateMetadata() {
  const strapiData = await getHomePage();
  return{
    title:strapiData?.data.title,
    description:strapiData?.data.description,
  } 


}

export default async function Home() {
  const strapiData = await getHomePage();
  console.log(strapiData)

  const homeAttributes = strapiData?.data?.attributes ?? strapiData?.data ?? null;
 
  const sections = Array.isArray(homeAttributes?.sections) ? homeAttributes.sections : [];
  const heroSection = sections.find((s: Section ) => s?.__component === "layout.hero-section") ?? sections[0] ?? null;

  return (
    <>
     <HeroSection data={heroSection} />
    </>
  );
}
