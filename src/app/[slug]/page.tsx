import Image from "next/image";
import styles from "../styles/page.module.css";
import { CanvasElement } from "@/_components/Canvas";
import { ModularCanvas } from "@/_components/ModularCanvas";
import Link from "next/link";
import { Rules } from "@/lib/automata-rules";
import { notFound } from "next/navigation";
import { Spacing } from "@/_components/Spacing";


export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rule = Rules[slug];

  if (!rule) notFound();

  return (
    <div className={styles.page}>
      <h1>{rule.name}</h1>

      <Spacing height={2}/>
     
     <p>{rule.description}</p>

      <Spacing height={2}/>
      
      <div>
        <ModularCanvas ruleKey={slug} />
      </div>
      <Spacing height={2}/>
      <div className={styles.ctas}>
        <Link
          className={styles.primary}
          href="/"
          rel="noopener noreferrer"
        >
          Back
        </Link>
        <a
          className={styles.secondary}
          href={`/${slug}`}
          rel="noopener noreferrer"
        >
          Restart
        </a>
       
      </div>
    </div>
  );
}
