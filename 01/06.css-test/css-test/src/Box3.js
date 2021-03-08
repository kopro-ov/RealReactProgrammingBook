import React from 'react';
import cn from 'classnames';
import style from './Box3.module.scss';

function Box({size}) {
    if(size == 'big') {
        return <div className={cn(style.button, style.big)}>큰 박스</div>;
    } else {
        return <div className={cn(style.button, style.small)}>작은 박스</div>;
    }
}

export default Box;
console.log(style);