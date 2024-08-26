"use server";

export async function submitForm(data: object) {
  try {
    const response = await fetch(
      "https://x9oo-fwyq-gkdq.n7.xano.io/api:1ueQQ0Od/site_check_ins",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return response.status;
  } catch (error) {
    console.error("An error occurred", error);
  }
}
