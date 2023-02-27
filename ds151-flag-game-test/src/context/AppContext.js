import React, {createContext, useReducer, useState} from 'react';

const AppContext = createContext(null);

import _ from '../../underscore-esm-min';

import { countries } from '../../countries';
 
function appReducer(state, action){
    switch(action.type){
        case 'addPoint':
            return({
                ...state,
                points: state.points + 1
            })
        case 'nextStage':
            return({
                ...state,
                stage: state.stage + 1
            })
        case 'setName':
            return({
                ...state,
                name: action.payload
            })
        case 'createGame':
            return({
                ...state,
                points: 0,
                stage: 0,
                with_time: false,
                timeout: 0,
                game: action.payload
            })
        case 'createGameWithTime':
            return({
                ...state,
                points: 0,
                stage: 0,
                with_time: true,
                timeout: action.payload.timeout,
                game: action.payload.game
            })
        case 'generateNextStage':
            return({
                ...state,
                game: action.payload
            })
        case 'clearGame':
            return({
                ...state,
                name: '',
                points: 0,
                stage: 0,
                with_time: false,
                timeout: 0,
                game: []
            })
        default:
            return({...state});
    }
}

function AppProvider({children}){

    const max_stages = 10;
    const max_questions = 4;
    const timeout = 30000;

    //{id: 1, name: 'name', score: 10}
    const [namesPoints, setNamesPoints] = useState([]);
    const [namesTime, setNamesTime] = useState([]);

    const [timeoutHandler, setTimoutHandler] = useState(null);
    const [timedOut, setTimedOut] = useState(false);

    const [timerHandler, setTimerHandler] = useState(null);
    const [timer, setTimer] = useState(0);

    function tick(){
        setTimer((value) => value + 1);
    }

    const [appState, dispatch] = useReducer(appReducer, {
        name: '',
        points: 0,
        stage: 0,
        timeout: 0,
        with_time: false,
        game: []
    })

    function addPoint(){
        dispatch({type: 'addPoint'});
    }

    function setPlayerName(name){
        dispatch({type: 'setName', payload: name})
    }

    function clearGame(){
        setTimedOut(false);
        setTimer(0);
        setTimoutHandler(null);
        setTimerHandler(null);
        dispatch({type: 'clearGame'});
    }

    function createGame(){

        const shuffledCountries = _.shuffle(countries);
        let newGame = [];
        let stageObj;

        for(let i = 0; i < max_stages; i++){
            stageObj = {};
            stageObj['options'] = _.sample(shuffledCountries, max_questions);
            stageObj['answer'] =  _.sample(stageObj['options'], 1)[0];

            newGame.push(stageObj);
        }

        dispatch({type: 'createGame', payload: newGame})

    }

    function createGameWithTime(){

        const shuffledCountries = _.shuffle(countries);
        let newGame = [];
        let stageObj;

        //neste caso cria somente uma fase
        stageObj = {};
        stageObj['options'] = _.sample(shuffledCountries, max_questions);
        stageObj['answer'] =  _.sample(stageObj['options'], 1)[0];
        newGame.push(stageObj);

        setTimoutHandler(setTimeout(() => setTimedOut(true), timeout)); 
        setTimerHandler(setInterval(() => tick(), 1000));

        dispatch({type: 'createGameWithTime', payload: { game: newGame, timeout: timeout }})

    }

    function generateNextStage(){

        const shuffledCountries = _.shuffle(countries);
        //neste caso cria somente uma fase
        let newGame = [...appState.game];

        let stageObj = {};
        stageObj['options'] = _.sample(shuffledCountries, max_questions);
        stageObj['answer'] =  _.sample(stageObj['options'], 1)[0];

        newGame.push(stageObj);

        dispatch({type: 'generateNextStage', payload: newGame})

    }

    function nextStage(){
        dispatch({type: 'nextStage'})
    }

    return(
        <AppContext.Provider value={{
            appState, 
            max_stages,
            addPoint,
            nextStage,
            setPlayerName,
            clearGame,
            createGame,
            createGameWithTime,
            generateNextStage,
            timedOut,
            setNamesPoints,
            namesPoints,
            setNamesTime,
            namesTime,
            timer
        }}>
            {children}
        </AppContext.Provider>
    )

}

export { AppContext, AppProvider};