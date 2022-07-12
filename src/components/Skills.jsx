import Circle from 'react-circle';
import React from 'react';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import {
  skillReducer,
  initialState,
  actionTypes,
} from '../reducers/skillReducer';
import { requestStates } from '../constants';

export const Skills = () => {
  const [state, dispatch] = useReducer(skillReducer, initialState);

  useEffect(() => {
    dispatch({ type: actionTypes.fetch });
    axios
      .get('https://api.github.com/users/Nyowa450/repos')
      .then((response) => {
        const languageList = response.data.map((res) => res.language);
        const countedLanguageList = generateLanguageCountObj(languageList);
        dispatch({
          type: actionTypes.success,
          payload: { languageList: countedLanguageList },
        });
      })
      .catch(() => {
        dispatch({ type: actionTypes.error });
      });
  }, []);

  const generateLanguageCountObj = (allLanguageList) => {
    const notNullLanguageList = allLanguageList.filter(
      (language) => language != null
    );
    const uniqueLanguageList = [...new Set(notNullLanguageList)];

    return uniqueLanguageList.map((item) => {
      return {
        language: item,
        count: allLanguageList.filter((language) => language === item).length,
      };
    });
  };
  const converseCountToPercentage = (count) => {
    if (count > 10) {
      return 100;
    }
    return count * 10;
  };

  const sortedData = state.languageList.sort((firstLang, nextLang) => {
    return nextLang.count - firstLang.count;
  });

  return (
    <div id="skills">
      <div className="container">
        <div className="heading">
          <h2>Skills</h2>
        </div>
        <div className="skills-container">
          {state.requestState === requestStates.loading && (
            <p className="description">取得中...</p>
          )}
          {state.requestState === requestStates.error && (
            <p className="description">Error Occuerd.</p>
          )}
          {state.requestState === requestStates.success &&
            // 戻り値はそのままなのでreturnを省略

            sortedData.map((item, index) => (
              <div className="skill-item" key={index}>
                <p className="description">
                  <strong>{item.language}</strong>
                </p>
                <Circle
                  animate
                  progres={converseCountToPercentage(item.count)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
