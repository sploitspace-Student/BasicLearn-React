type SectionProps = {
  id: string;
  title: string;
};

export default function Section({ id, title }: SectionProps) {
  return (
    <section id={id} className="section">
      <h2>{title}</h2>
    </section>
  );
}
