import React from "react";
import { SettingsOptionEnum } from "@/modules/Accounts/enums";
import Proxy from "@/modules/Settings/Proxy/Proxy";
import CreateProxy from "@/modules/Settings/Proxy/CreateProxy";
import Browser from "@/modules/Settings/Browser/Browser";
import CreateBrowser from "@/modules/Settings/Browser/CreateBrowser";
import Behavior from "@/modules/Settings/Behavior/Behavior";
import CreateBehavior from "@/modules/Settings/Behavior/CreateBehavior";
import Autojoin from "@/modules/Settings/Autojoin/Autojoin";
import CreateAutojoin from "@/modules/Settings/Autojoin/CreateAutojoin";
import Pinned from "@/modules/Settings/Pinned/Pinned";
import CreatePinned from "@/modules/Settings/Pinned/CreatePinned";


const EditModal = ({ value, selectProxy, selectBrowser, selectBehavior, selectAutojoin, selectPinned, edditedId }) => {
    const component = {
        [SettingsOptionEnum.PROXY]: <Proxy editAcc selectProxy={selectProxy} />,
        [SettingsOptionEnum.ADD_PROXY]: <CreateProxy selectProxy={selectProxy} />,
        [SettingsOptionEnum.EDIT_PROXY]: <CreateProxy selectProxy={selectProxy} edditedId={edditedId} />,  // Fallback content when `edditedId` is undefined
        [SettingsOptionEnum.BROWSER]: <Browser editAcc selectBrowser={selectBrowser} />,
        [SettingsOptionEnum.ADD_BROWSER]: <CreateBrowser selectBrowser={selectBrowser} />,
        [SettingsOptionEnum.EDIT_BROWSER]: <CreateBrowser selectBrowser={selectBrowser} edditedId={edditedId} />,
        [SettingsOptionEnum.BEHAVIOUR]: <Behavior editAcc selectBehavior={selectBehavior} />,
        [SettingsOptionEnum.ADD_BEHAVIOUR]: <CreateBehavior selectBehavior={selectBehavior} edditedId={edditedId} />,
        [SettingsOptionEnum.EDIT_BEHAVIOUR]: <CreateBehavior selectBehavior={selectBehavior} edditedId={edditedId} />,
        [SettingsOptionEnum.AUTOJOIN]: <Autojoin editAcc selectAutojoin={selectAutojoin} />,
        [SettingsOptionEnum.ADD_AUTOJOIN]: <CreateAutojoin selectAutojoin={selectAutojoin} edditedId={edditedId} />,
        [SettingsOptionEnum.EDIT_AUTOJOIN]: <CreateAutojoin selectAutojoin={selectAutojoin} edditedId={edditedId} />,
        [SettingsOptionEnum.PINNED]: <Pinned editAcc selectPinned={selectPinned} />,
        [SettingsOptionEnum.ADD_PINNED]: <CreatePinned selectPinned={selectPinned} edditedId={edditedId} />,
        [SettingsOptionEnum.EDIT_PINNED]: <CreatePinned selectPinned={selectPinned} edditedId={edditedId} />,

    };
    return (<>
            {component[value]}
        </>

    );
};

export default EditModal;