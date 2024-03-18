import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { StyleProps } from "../types";
import { ThemeContext } from "../context/theme-context";
import { themesObject } from "../context/themes";
import { LogoutButton } from "./logout";
import { UserContext } from "../context/user.context";

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
    // console.log('ProfileBar loaded')
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const {userObj} = useContext(UserContext);

    // console.log('Show Menu: ', showMenu)
    // console.log(userObj.userInfo.imageUrl)
    return (
        <>
            <ProfileContainer onClick={() => setShowMenu(!showMenu)}>
                <ProfilePictureWrapper>
                    <ProfilePicture src={userObj.userInfo.imageUrl} alt="Uh-oh!" referrerPolicy="no-referrer"/>
                </ProfilePictureWrapper>
            </ProfileContainer>
                
            {showMenu && 
                <DropDownMenuContainer>
                    <p>HELLO!</p>
                    <LogoutButton/>
                </DropDownMenuContainer>
            }
        </>
    )
}

export default ProfileBar