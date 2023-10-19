export async function fetchWallet() {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    return data;
  } catch (error:any) {
    return error.message;
  }
}
