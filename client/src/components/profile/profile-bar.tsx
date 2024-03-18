import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { StyleProps } from "../../types";
import { ThemeContext } from "../../context/theme-context";
import { themesObject } from "../../context/themes";
import { LogoutButton } from "./logout-button";
import { UserContext } from "../../context/user.context";
import ProfileMenu from "./profile-dropdown";
import useOutsideClick from "../../utils/useOutsideClick";

const ProfileContainer = styled.div`
    height: 50px;
    width: 150px;
    background-color: pink;
    position: absolute;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ProfilePictureWrapper = styled.div`
    background-color: blue;
    width: 50px;
    height: 50px;
`

const ProfilePicture = styled.img`
    height: 100%;
    width: 100%;
    border-radius: 50%;
`

const DropDownMenuContainer = styled.div`
    width: 200px;
    height: fit-content;
    position: absolute;
    right: 10px;
    top: 60px;
    background-color: white;
`

const ProfileBar = (): JSX.Element => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const {userObj} = useContext(UserContext);

    const menuRef = useRef(null);

    useOutsideClick(menuRef, () => {
        if (showMenu) setShowMenu(false);
    })

    return (
        <>
            <ProfileContainer ref={menuRef} onClick={() => setShowMenu(!showMenu)}>
                <ProfilePictureWrapper>
                    <ProfilePicture src={userObj.userInfo.imageUrl} alt="Uh-oh!" referrerPolicy="no-referrer"/>
                </ProfilePictureWrapper>
            </ProfileContainer>
                
            {showMenu && 
                <ProfileMenu />
            }
        </>
    )
}

export default ProfileBar