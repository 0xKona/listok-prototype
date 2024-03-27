import React, { createContext, useContext, useEffect, useState } from 'react';
import { weekDataInterface } from '../types';
import { UserContext } from './user.context';

interface WeekContextInterface {
    weekData: any;
    setWeekData: any
}

export const WeekContext = createContext<WeekContextInterface>({
    weekData: {},
    setWeekData: () => {},
});

export const WeekContextProvider = (props: any): JSX.Element => {
    const {userObj} = useContext(UserContext);

    const getMostRecentMonday = () => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const difference = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const mostRecentMonday = new Date(today.setDate(today.getDate() - difference));
    
        return mostRecentMonday.toISOString().split('T')[0];
    }

    const [weekData, setWeekData] = useState<weekDataInterface>({
        week_id: null,
        week_start: getMostRecentMonday(),
        users_user_id: null,
        dayData: {
            mon: null, // recipeId here
            tue: null,
            wed: null,
            thur: null,
            fri: null,
            sat: null, 
            sun: null
        }
    });

    

    useEffect(() => {
        if (userObj && userObj.userInfo && userObj.userInfo.listokId) {
            setWeekData(currentWeekData => ({
                ...currentWeekData,
                users_user_id: userObj.userInfo.listokId,
            }));
        }
    }, [userObj]);

    const fetchWeekData = async() => {
        const weekStart = weekData.week_start;
        const userId = weekData.users_user_id;
    
        try {
            const response = await fetch(`/api/weeks/${weekStart}/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setWeekData({
                    week_id: data.week_id,
                    week_start: data.week_start,
                    users_user_id: data.users_user_id,
                    dayData: {
                        mon: data.mon,
                        tue: data.tue,
                        wed: data.wed,
                        thur: data.thur,
                        fri: data.fri,
                        sat: data.sat, 
                        sun: data.sun
                    }})
            }
        } catch (error) {
            console.error('Error fetching week data:', error);
        }
    }

    useEffect(() => {
        if (weekData.week_start && weekData.users_user_id) {
            fetchWeekData()    
        }
    }, [weekData.week_start, weekData.users_user_id])
    
    return (
        <WeekContext.Provider value={{ weekData, setWeekData }}>
            {props.children}
        </WeekContext.Provider>
    )
}