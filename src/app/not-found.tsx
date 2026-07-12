import {getDictionary} from "@/app/dictionaries";
import {NotFoundClient} from "./NotFoundClient";

export default async function NotFound() {
  const dict = await getDictionary();

  return <NotFoundClient dict={dict} />;
}
