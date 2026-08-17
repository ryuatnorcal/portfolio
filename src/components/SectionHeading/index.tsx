type SectionHeadingProps = {
  index?: string;
  title: string;
};

export const SectionHeading = ({ index, title }: SectionHeadingProps) => {
  return (
    <div className="mb-10">
      {index ? (
        <span className="mb-3 block font-mono text-xs uppercase tracking-widest text-accent">
          {index}
        </span>
      ) : null}
      <h2 className="m-0 font-display text-3xl font-semibold text-fg">{title}</h2>
    </div>
  );
};

export default SectionHeading;
