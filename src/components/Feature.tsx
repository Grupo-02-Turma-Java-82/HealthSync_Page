export interface FeaturesProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function Feature({ title, description, icon }: FeaturesProps) {
  return (
    <div className="rounded-lg bg-card text-card-foreground shadow-sm card-gradient shadow-card hover-lift transition-smooth border-0">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div>
            <h4 className="font-heading font-semibold text-lg mb-2 text-foreground">
              {title}
            </h4>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
