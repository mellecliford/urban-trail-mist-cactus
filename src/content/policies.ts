export type PolicyId = "privacy" | "terms" | "cookies";

type Section = { heading: string; paragraphs: string[] };
type Policy = { title: string; kicker: string; updated: string; lede: string; sections: Section[] };

const updated = { en: "7 October 2026", fr: "7 octobre 2026" };

export const policies: Record<PolicyId, { en: Policy; fr: Policy }> = {
  privacy: {
    en: {
      title: "Privacy",
      kicker: "Privacy notice",
      updated: updated.en,
      lede: "This notice describes what eveOps Group’s website actually does with information. It does not describe a data practice the site does not have.",
      sections: [
        {
          heading: "Who we are",
          paragraphs: [
            "This website is operated by eveOps Group. Unity Integrated Solutions and eveDev Ops are divisions of the group.",
            "Privacy questions: support@eveopsgroup.com or +237 671 361 513.",
          ],
        },
        {
          heading: "What you can send us",
          paragraphs: [
            "The contact form and the homepage enquiry ask for your name, email address, and a short description. Optional fields can include organisation, phone number, country, service, volume, timing, and preferred way to reply.",
            "Those details are stored so the team can reply. When mail is connected in the studio, a copy is also emailed to the inbox set there. The form is not used for advertising.",
            "You can also write or call using the address and number shown on the contact page. Anything sent that way is handled by the people answering that channel.",
          ],
        },
        {
          heading: "What we do not collect on the public pages",
          paragraphs: [
            "The public site does not run advertising or analytics cookies. It does not sell personal information. It does not ask you to create an account to read the site.",
            "A signed-in session, used only for a protected area, is kept with essential cookies. Those cookies are described on the cookie notice.",
          ],
        },
        {
          heading: "Fonts",
          paragraphs: [
            "The site loads Manrope, Fraunces, and Source Serif 4 from Google Fonts. Your browser therefore requests those font files from Google, which can receive your IP address and usual request data. That request is not an eveOps cookie.",
          ],
        },
        {
          heading: "How long it stays",
          paragraphs: [
            "An enquiry is kept for as long as it takes to answer it and, if work follows, to carry that work out. You can ask for it to be corrected or deleted by writing to the address on the contact page.",
            "The cookie notice choice stays in this browser, under eveops-cookie-notice, until you clear site data.",
          ],
        },
        {
          heading: "Your choices",
          paragraphs: [
            "You can clear this site’s local storage in your browser settings. You can refuse or delete cookies in the browser. Essential session cookies are used only after a sign-in.",
            "If you want a copy of an enquiry corrected or deleted, write to the address on the contact page.",
          ],
        },
        {
          heading: "Children",
          paragraphs: ["This website is for organisations and adults. It is not directed at children, and we do not knowingly ask a child for personal information."],
        },
      ],
    },
    fr: {
      title: "Confidentialité",
      kicker: "Notice de confidentialité",
      updated: updated.fr,
      lede: "Cette notice décrit ce que le site d’eveOps Group fait réellement des informations. Elle ne décrit pas une pratique de collecte que le site n’a pas.",
      sections: [
        {
          heading: "Qui sommes-nous",
          paragraphs: [
            "Ce site est édité par eveOps Group. Unity Integrated Solutions et eveDev Ops sont des divisions du groupe.",
            "Questions de confidentialité : support@eveopsgroup.com ou +237 671 361 513.",
          ],
        },
        {
          heading: "Ce que vous pouvez nous transmettre",
          paragraphs: [
            "Le formulaire de contact et la demande depuis l’accueil demandent votre nom, votre e-mail et une courte description. Des champs facultatifs peuvent inclure l’organisation, le téléphone, le pays, le service, le volume, le calendrier et le mode de réponse.",
            "Ces éléments sont enregistrés afin que l’équipe puisse répondre. Lorsque la messagerie est connectée dans le studio, une copie est aussi envoyée à la boîte définie là. Le formulaire ne sert pas à de la publicité.",
            "Vous pouvez aussi écrire ou appeler avec l’adresse et le numéro indiqués sur la page contact. Ce qui passe par ce canal est traité par les personnes qui y répondent.",
          ],
        },
        {
          heading: "Ce que les pages publiques ne collectent pas",
          paragraphs: [
            "Le site public n’utilise pas de cookies publicitaires ni de mesure d’audience. Il ne vend pas d’informations personnelles. Il ne demande pas de compte pour lire les pages.",
            "Une session connectée, uniquement pour un espace protégé, repose sur des cookies essentiels. Ils sont décrits dans la notice cookies.",
          ],
        },
        {
          heading: "Polices",
          paragraphs: [
            "Le site charge Manrope, Fraunces et Source Serif 4 depuis Google Fonts. Votre navigateur demande donc ces fichiers à Google, qui peut recevoir votre adresse IP et les données habituelles de requête. Cette requête n’est pas un cookie d’eveOps.",
          ],
        },
        {
          heading: "Durée",
          paragraphs: [
            "Une demande est conservée le temps d’y répondre et, si un travail suit, le temps de le mener. Vous pouvez demander une correction ou une suppression en écrivant à l’adresse de la page contact.",
            "Le choix affiché sur la bannière cookies reste dans ce navigateur, sous eveops-cookie-notice, jusqu’à ce que vous effaciez les données du site.",
          ],
        },
        {
          heading: "Vos choix",
          paragraphs: [
            "Vous pouvez effacer le stockage local de ce site dans les réglages du navigateur. Vous pouvez refuser ou supprimer les cookies. Les cookies de session essentiels ne sont utilisés qu’après une connexion.",
            "Pour faire corriger ou supprimer une demande, écrivez à l’adresse indiquée sur la page contact.",
          ],
        },
        {
          heading: "Mineurs",
          paragraphs: ["Ce site s’adresse aux organisations et aux adultes. Il ne vise pas les enfants, et nous ne demandons pas sciemment d’informations personnelles à un enfant."],
        },
      ],
    },
  },
  cookies: {
    en: {
      title: "Cookies",
      kicker: "Cookie notice",
      updated: updated.en,
      lede: "eveOps Group uses only the cookies this site needs. There is no advertising cookie and no analytics cookie.",
      sections: [
        {
          heading: "Essential session cookies",
          paragraphs: [
            "If you sign in to a protected area, the browser stores a session cookie. It is marked Secure and HttpOnly, with SameSite=Lax, and it is limited to this site. A short-lived signed copy may also be stored so the session can be read without an extra database call. These cookies exist to keep that sign-in intact. They are not used to follow you across other websites.",
            "The public pages do not set these cookies.",
          ],
        },
        {
          heading: "What is stored without a cookie",
          paragraphs: [
            "Your choice on this notice is saved in local storage as eveops-cookie-notice. Local storage is not sent to our server with each page view. Contact form enquiries are stored so the team can reply.",
          ],
        },
        {
          heading: "Third parties",
          paragraphs: [
            "Google Fonts serves the typefaces. That is a request to Google’s servers, not a cookie set by eveOps. See the privacy notice.",
          ],
        },
        {
          heading: "How to refuse",
          paragraphs: [
            "You can block or delete cookies in your browser. Blocking essential session cookies only affects a signed-in area. You can clear local storage to remove the notice choice and any enquiry saved on this device.",
          ],
        },
      ],
    },
    fr: {
      title: "Cookies",
      kicker: "Notice cookies",
      updated: updated.fr,
      lede: "eveOps Group n’utilise que les cookies nécessaires à ce site. Il n’y a pas de cookie publicitaire ni de cookie de mesure d’audience.",
      sections: [
        {
          heading: "Cookies de session essentiels",
          paragraphs: [
            "Si vous vous connectez à un espace protégé, le navigateur conserve un cookie de session. Il est marqué Secure et HttpOnly, avec SameSite=Lax, et il est limité à ce site. Une copie signée de courte durée peut aussi être conservée afin de lire la session sans un appel supplémentaire à la base. Ces cookies servent uniquement à maintenir cette connexion. Ils ne servent pas à vous suivre sur d’autres sites.",
            "Les pages publiques ne déposent pas ces cookies.",
          ],
        },
        {
          heading: "Ce qui est stocké sans cookie",
          paragraphs: [
            "Votre choix sur cette notice est enregistré dans le stockage local sous eveops-cookie-notice. Le stockage local n’est pas envoyé à notre serveur à chaque page. Les demandes du formulaire de contact sont enregistrées afin que l’équipe puisse répondre.",
          ],
        },
        {
          heading: "Tiers",
          paragraphs: [
            "Google Fonts fournit les polices. Il s’agit d’une requête vers les serveurs de Google, pas d’un cookie déposé par eveOps. Voir la notice de confidentialité.",
          ],
        },
        {
          heading: "Comment refuser",
          paragraphs: [
            "Vous pouvez bloquer ou supprimer les cookies dans votre navigateur. Bloquer les cookies de session essentiels n’affecte qu’un espace connecté. Vous pouvez effacer le stockage local pour retirer le choix de la bannière et toute demande enregistrée sur cet appareil.",
          ],
        },
      ],
    },
  },
  terms: {
    en: {
      title: "Terms",
      kicker: "Terms of use",
      updated: updated.en,
      lede: "These terms cover use of the eveOps Group website. They are not a contract for services or software.",
      sections: [
        {
          heading: "The site",
          paragraphs: [
            "The pages describe eveOps Group, Unity Integrated Solutions, and eveDev Ops. Product notes, including Shweng, stay high-level while work is in progress. Do not treat a page, a PDF, or a form as a promise of a result, a price, or a start date.",
          ],
        },
        {
          heading: "No engagement until it is agreed",
          paragraphs: [
            "Sending a form, downloading a profile, or downloading a brief template does not create a project. Work starts only when both sides agree in writing. A form saved in your browser has not been delivered to the team unless you also email or call.",
          ],
        },
        {
          heading: "Acceptable use",
          paragraphs: [
            "Do not misuse the site: do not attempt to break it, probe it without permission, or submit unlawful, misleading, or someone else’s confidential material. Do not copy the site and present it as your own.",
          ],
        },
        {
          heading: "Our material",
          paragraphs: [
            "Text, the eveOps mark, page design, and the downloadable profiles belong to eveOps Group unless a page says otherwise. You may download a profile or brief to discuss work with us. You may not republish them as your own offer.",
          ],
        },
        {
          heading: "Availability and liability",
          paragraphs: [
            "The site is provided as it is available. We may change or remove pages. We do not warrant that the site will be uninterrupted.",
            "Nothing here limits a right that the law does not allow us to limit. Otherwise, eveOps Group is not liable for loss arising only from your use of the public website.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: ["Questions about these terms: support@eveopsgroup.com."],
        },
      ],
    },
    fr: {
      title: "Conditions",
      kicker: "Conditions d’utilisation",
      updated: updated.fr,
      lede: "Ces conditions couvrent l’usage du site d’eveOps Group. Elles ne constituent pas un contrat de service ou de logiciel.",
      sections: [
        {
          heading: "Le site",
          paragraphs: [
            "Les pages présentent eveOps Group, Unity Integrated Solutions et eveDev Ops. Les notes produit, y compris Shweng, restent générales tant que le travail est en cours. Une page, un PDF ou un formulaire n’est pas une promesse de résultat, de prix ou de date de démarrage.",
          ],
        },
        {
          heading: "Pas de mission tant qu’elle n’est pas convenue",
          paragraphs: [
            "Envoyer un formulaire, télécharger un profil ou télécharger un modèle de brief ne crée pas un projet. Le travail commence seulement lorsque les deux parties se mettent d’accord par écrit. Un formulaire enregistré dans votre navigateur n’a pas été remis à l’équipe, sauf si vous écrivez ou appelez aussi.",
          ],
        },
        {
          heading: "Usage acceptable",
          paragraphs: [
            "N’utilisez pas le site de façon abusive : ne tentez pas de le casser, de le sonder sans autorisation, ni d’y déposer un contenu illicite, trompeur, ou confidentiel appartenant à quelqu’un d’autre. Ne copiez pas le site pour le présenter comme le vôtre.",
          ],
        },
        {
          heading: "Nos contenus",
          paragraphs: [
            "Les textes, la marque eveOps, la conception des pages et les profils téléchargeables appartiennent à eveOps Group, sauf mention contraire. Vous pouvez télécharger un profil ou un brief pour discuter d’un travail avec nous. Vous ne pouvez pas les republier comme votre propre offre.",
          ],
        },
        {
          heading: "Disponibilité et responsabilité",
          paragraphs: [
            "Le site est fourni selon sa disponibilité. Nous pouvons modifier ou retirer des pages. Nous ne garantissons pas un accès ininterrompu.",
            "Rien ici ne limite un droit que la loi ne nous permet pas de limiter. Pour le reste, eveOps Group n’est pas responsable d’un préjudice qui résulterait seulement de l’usage du site public.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: ["Questions sur ces conditions : support@eveopsgroup.com."],
        },
      ],
    },
  },
};
