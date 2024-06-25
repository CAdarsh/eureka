import Image from "next/image";

export default function CheckBox({ checked, setChecked}: {
    checked: boolean;
    setChecked: Function;
}) {
    return <div onClick={() => setChecked((checked: boolean) => !checked )} className="checkbox">
        {checked ? <Image className="fade-in" src="/checkmark.svg" alt="Checkmark" width={8} height={8} /> : <></>}
    </div>;
}