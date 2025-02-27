const PageTitle = ({ title, description }: { title?: string; description?: string }) => {
  return (
    <div>
      {title && <h1 className="text-3xl font-bold">{title}</h1>}
      {description && <p className="text-muted-foreground mt-2">{description}</p>}
    </div>
  );
};

export default PageTitle;
