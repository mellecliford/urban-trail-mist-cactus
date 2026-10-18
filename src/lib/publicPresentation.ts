export type PublicDivision = "unity" | "edevops";
export type PublicLocale = "en" | "fr";

export function shouldShowDivisionRouteBar(division: PublicDivision) {
  return division === "unity" || division === "edevops";
}

export function getDivisionHeroHeadline(division: PublicDivision, locale: PublicLocale) {
  if (division === "unity") return "Unity Integrated Solutions";
  return locale === "fr" ? "Planifiez les systèmes qui font avancer le travail." : "Plan the systems that move the work forward.";
}

export function getContactRoutePresentation(route: PublicDivision, locale: PublicLocale) {
  const isFrench = locale === "fr";
  return {
    className: `contact-page--route-${route}`,
    eyebrow: isFrench ? "Brief de projet" : "Project brief",
    headlineLead: isFrench ? "Commencez par un" : "Start with a",
    headlineEmphasis: isFrench ? "brief utile." : "useful brief.",
    description: isFrench
      ? "Choisissez le parcours correspondant au travail. Décrivez le résultat attendu, les personnes concernées et les contraintes importantes ; nous vous aiderons à organiser la suite."
      : "Choose the route that matches the work. Describe the outcome, the people involved, and the constraints that matter; we will help organize the next working step.",
  };
}
