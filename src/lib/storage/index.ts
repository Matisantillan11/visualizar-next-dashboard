import { createClient } from "@supabase/supabase-js";

// Inicializa el cliente de Supabase
const supabaseUrl: string = String(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseAnonKey: string = String(
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Sube un archivo a Supabase Storage y devuelve su URL pública.
 *
 * @param {File} file - El archivo a subir.
 * @param {string} bucket - El bucket de almacenamiento para subir el archivo.
 * @param {string} path - La ruta dentro del bucket para almacenar el archivo.
 * @returns {Promise<string>} - La URL pública del archivo subido.
 */
export const storeFile = async (
  file: File,
  bucket: string,
  path: string,
): Promise<string | undefined> => {
  try {
    await supabase.storage.from(bucket).upload(path, file, { upsert: false });

    const response = await supabase.storage.from(bucket).getPublicUrl(path);

    return response.data.publicUrl;
  } catch (error) {
    console.error("Ocurrió un error inesperado:", error);
    throw error;
  }
};
