import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { StyleProps } from "../../types";
import { ThemeContext } from "../../context/theme-context";
import { themesObject } from "../../context/themes";
import { LogoutButton } from "./logout-button";
import { UserContext } from "../../context/user-context";
import ProfileMenu from "./profile-dropdown";
import useOutsideClick from "../../utils/useOutsideClick";

const Wrapper = styled.div`
    height: 50px;
    width: 150px;
    position: absolute;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ProfileContainer = styled.div`
    margin: 5px;
`

const ProfilePictureWrapper = styled.div`
    width: 50px;
    height: 50px;
`

const ProfilePicture = styled.img`
    height: 100%;
    width: 100%;
    border-radius: 50%;
    cursor: pointer;
`

const ProfileBar = (): JSX.Element => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const {userObj} = useContext(UserContext);

    const menuRef = useRef(null);

    useOutsideClick(menuRef, () => {
        if (showMenu) setShowMenu(false);
    })

    return (
        <Wrapper ref={menuRef}>
            <ProfileContainer onClick={() => setShowMenu(!showMenu)}>
                <ProfilePictureWrapper>
                    <ProfilePicture src={userObj.userInfo.imageUrl} alt="Uh-oh!" referrerPolicy="no-referrer"/>
                </ProfilePictureWrapper>
            </ProfileContainer>
                
            {showMenu && 
                <ProfileMenu />
            }
        </Wrapper>
    )
}

export default ProfileBar