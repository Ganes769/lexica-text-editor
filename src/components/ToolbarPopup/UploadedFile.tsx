import { useHeadingContext } from "../../context/HeadingContext";
import ChipComponent from "../Chip/Chip";
interface Props {
  file: File[];
  handleDelete: (fileName: string) => void;
}
export default function UploadedFile({ file, handleDelete }: Props) {
  const { setIsFileOpen } = useHeadingContext();

  return (
    <>
      {file?.length > 0 && (
        <div style={{ display: "flex", alignItems: "center" }}>
          {file.map((file) => (
            <ChipComponent
              name={file.name}
              onDelete={() => handleDelete(file.name)}
            />
          ))}
          <button onClick={() => setIsFileOpen(true)} className="add-file" />
        </div>
      )}
    </>
  );
}
