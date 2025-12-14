import InstitutionForm from "../create/_components/institution-form";
import { getInstitutionById } from "./action";

export default async function InstitutionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params)?.id;
  const intitution = await getInstitutionById(id);
  return <InstitutionForm institutionId={id} institution={intitution} />;
}
