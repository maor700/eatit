import { FC, InputHTMLAttributes, useEffect, useState } from "react";
import { MdClose, MdModeEdit, MdSave } from "react-icons/md";
import { useToggle } from "../../hooks/useToggle";
import { getUrlImage } from "../../services/recipes-api-service";
import "./FormElements.less";

export type Option = { value: any, label: string, image?: string };

type InputField = InputHTMLAttributes<HTMLInputElement> & {
    previewMode?: boolean;
    onSave?: (value: string) => void;
    isSearchInput?: boolean;
    selected?: Option;
    onSelectOption?: (selected: Option, oldSelected: Option) => void;
    getOptions?: (word: string) => Promise<Option[]>
    editModeOnly?: boolean;
    onRemove?: (option: Option) => void
}

export const InputField: FC<InputField> = ({ onRemove, children, editModeOnly, previewMode, getOptions, onSave, onSelectOption, isSearchInput, selected, ...rest }) => {
    const { isToggled: isEditMode, toggle: toggleEditMode } = useToggle(!previewMode);
    const [options, setOptions] = useState<Option[]>([]);
    const [inputVal, setInputVal] = useState<string>(rest?.value + "" || '');
    const [selectedOption, setSelectedOption] = useState<Option>(selected ?? { value: "", label: "", image: "" });
    const [oldSelectedOption, setOldSelectedOption] = useState<Option>(selected ?? { value: "", label: "", image: "" });
    const { isToggled: showOptionsBar, toggle: toggleOptionsBar } = useToggle(false);

    const saveHandler = () => { toggleEditMode(false); onSave?.(inputVal + "") }

    useEffect(() => {
        setInputVal(selectedOption.value);
        onSelectOption?.(selectedOption, oldSelectedOption);
        saveHandler();
    }, [selectedOption]);

    useEffect(() => {
        if (inputVal?.length < 2 || inputVal === selectedOption.value) {
            toggleOptionsBar(false);
            setOptions([]);
            return;
        }

        if (inputVal?.length >= 2 && getOptions) {
            getOptions(inputVal).then((newOptins) => {
                setOptions(newOptins);
                toggleOptionsBar(true);
            });
        }
    }, [inputVal, getOptions])

    return (
        <div className="field-group">
            {!isEditMode && !editModeOnly ? <div className="preview-con">
                <div className="prev">
                    {selectedOption.image && <img className={"opt-img"} src={getUrlImage(selectedOption.image, 100)} />}
                    {selectedOption.label}
                </div>
                <div className="act-con">
                    <MdModeEdit className="btn" onClick={() => toggleEditMode()} />
                    <MdClose className="btn" onClick={()=>selected && onRemove?.(selected)} />
                </div>
            </div> :
                <div className="input-con">
                    <input onChange={({ target }: any) => setInputVal(target?.value)} placeholder="some ingredient" type="text" className="field input"  {...rest} value={inputVal} />
                    <div className="act-con">
                        {children ?? <>
                            <MdSave className="btn" onClick={saveHandler} />
                            <MdClose  className="btn" onClick={() => { toggleEditMode(false);}} />
                        </>}
                    </div>
                    {showOptionsBar ?
                        <div className="searchOptions">
                            {options?.map((opt) => {
                                return (
                                    <div key={opt.value} onClick={() => { !editModeOnly && setOldSelectedOption(selectedOption); setSelectedOption?.(opt) }} className="opt">
                                        {opt.image && <img className="opt-img" src={getUrlImage(opt.image, 100)} alt="" />}
                                        <span>{opt?.label}</span>
                                    </div>
                                )
                            })}
                        </div>
                        : null}
                </div>
            }
        </div >
    )
}