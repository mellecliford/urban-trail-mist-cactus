export type Channel = {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
};

export type PublicContact = {
  group: Channel & { hours: string };
  unity: Channel & { hours: string };
  edevops: Channel & { hours: string };
};

export const defaultContact: PublicContact = {
  group: {
    email: "support@eveopsgroup.com",
    phone: "+237 671 361 513",
    whatsapp: "",
    address: "",
    hours: "",
  },
  unity: { email: "", phone: "", whatsapp: "", address: "", hours: "" },
  edevops: { email: "", phone: "", whatsapp: "", address: "", hours: "" },
};

export function resolveChannel(own: Channel, group: Channel): Channel {
  return {
    email: own.email.trim() || group.email,
    phone: own.phone.trim() || group.phone,
    whatsapp: own.whatsapp.trim() || group.whatsapp,
    address: own.address.trim() || group.address,
  };
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}
