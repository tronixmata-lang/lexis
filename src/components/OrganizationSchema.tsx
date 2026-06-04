import JsonLd from "./JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export default function OrganizationSchema() {
  return <JsonLd data={[organizationSchema(), websiteSchema()]} />;
}
