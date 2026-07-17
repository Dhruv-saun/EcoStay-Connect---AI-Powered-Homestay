import { supabase } from "./supabase";

export async function uploadHomestayImage(file: File) {
  if (!file) return null;

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}.${fileExt}`;

  const { error } = await supabase.storage
    .from("homestays")
    .upload(fileName, file);

  if (error) {
    console.error(error);
    throw error;
  }

  const { data } = supabase.storage
    .from("homestays")
    .getPublicUrl(fileName);

  return data.publicUrl;
}