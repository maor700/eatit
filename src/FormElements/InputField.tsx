import { FC, InputHTMLAttributes, useEffect, useState } from "react";
import { MdClose, MdModeEdit, MdSave } from "react-icons/md";
import { useToggle } from "../hooks/useToggle";
import "./FormElements.less";

type Option = { value: any, label: string };
type InputField = InputHTMLAttributes<HTMLInputElement> & {
    previewMode?: boolean;
    onSave?: (value: string) => void;
    isSearchInput?: boolean;
    selected?: Option;
    onSelectOption?: (selected: Option) => void;
    getOptions?: (inputVal: string) => Promise<Option[]>
}

export const InputField: FC<InputField> = ({ previewMode, getOptions, onSave, onSelectOption, isSearchInput, selected, ...rest }) => {
    const { isToggled: isEditMode, toggle: toggleEditMode } = useToggle(!previewMode);
    const [options, setOptions] = useState<Option[]>([]);
    const [inputVal, setInputVal] = useState<string>(rest?.value + "" || '');
    const [selectedOption, setSelectedOption] = useState<Option>({ value: "", label: "" });

    useEffect(() => {
        setInputVal(selectedOption.value);
        onSelectOption?.(selectedOption)
    }, [selectedOption]);

    useEffect(() => {
        if (inputVal === selectedOption.value) return;
        if (inputVal?.length >= 2 && getOptions) {
            getOptions(inputVal).then(setOptions);
        }
    }, [inputVal, getOptions])

    return (
        <div className="field-group">
            {!isEditMode ? <div className="preview-con">
                <div className="prev">test</div>
                <div className="act-con">
                    <MdModeEdit className="btn" onClick={() => toggleEditMode()} />
                    <MdClose className="btn" />
                </div>
            </div> :
                <div className="input-con">
                    <input onChange={({ target }: any) => setInputVal(target?.value)} placeholder="some ingredient" type="text" className="field input"  {...rest} value={inputVal} />
                    <div className="act-con">
                        <MdSave className="btn" onClick={() => { toggleEditMode(false); onSave?.(inputVal + "") }} />
                        <MdClose className="btn" onClick={() => { toggleEditMode(false) }} />
                    </div>
                    {isSearchInput ?
                        <div className="searchOptions">
                            {options?.map((opt) => {
                                return (
                                    <div onClick={() => { setSelectedOption?.(opt) }} className="opt">
                                        {opt?.label}
                                    </div>
                                )
                            })}
                        </div>
                        : null}
                </div>
            }
            {rest.children}
        </div >
    )
}