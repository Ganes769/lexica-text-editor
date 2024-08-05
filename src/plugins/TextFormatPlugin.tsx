import TextFormatMenu from "../components/TextFormatMenu/TextFormatMenu";
interface Props {
  setIsOpen: (isOpen: boolean) => void;
}
export default function TextFormatPlugin({ setIsOpen }: Props) {
  return <TextFormatMenu setIsOpen={setIsOpen} />;
}
