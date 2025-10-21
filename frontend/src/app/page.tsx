import LandingPage from "@/components/landing/landing";
import { data } from "@/lib/metadata";
const BACKEND_URL = 'http://localhost:3000'
export const metadata = data;

export default function Home() {
  // useEffect(() => {
  //   const makeRequest = async () => {
  //     const response = await fetch(`${BACKEND_URL}/chat`, {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         "message": "how are buddy GPT",
  //         "model": "openai/gpt-4o"
  //       })
  //     });

  //     if (!response.body) {
  //       console.error("No response body");
  //       return;
  //     }

  //     const reader = response.body.getReader();
  //     const decoder = new TextDecoder();

  //     try {
  //       while (true) {
  //         const { done, value } = await reader.read();

  //         if (done) {
  //           console.log('Stream finished');
  //           break;
  //         }

  //         const chunk = decoder.decode(value, { stream: true });
  //         console.log('Received chunk: ', chunk);
  //       }
  //     } catch (error) {
  //       console.error("Error reading stream", error);
  //     } finally {
  //       reader.releaseLock();
  //     }
  //   }

  //   makeRequest();
  // }, [])

  return (
    <LandingPage />
  );
}
