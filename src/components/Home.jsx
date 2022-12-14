import React, { useState, useEffect, useRef } from 'react';
import '../styles/Home.css'
import check from '../assests/check.png'
import wrong from '../assests/wrong.png'
// import arrow from '../assests/arrow-right.png'
import undo from '../assests/undo.png'
import pencil from '../assests/pencil.png'
import favicon from '../assests/favicon.png'
//eslint-disable-next-line
import dumb from '../assests/dumb.jpeg'
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask, EditTask, completeTask, ResetAllTask } from '../redux/action'
//Animations
import { wobble } from 'react-animations'
import Radium, { StyleRoot } from 'radium';



function Home() {

    const dispatch = useDispatch();

    const list = useSelector((state) => state.todo);
    // const user = useSelector((state) => state.user);

    const styles = {
        wobble: {
            animation: 'x 1s',
            animationName: Radium.keyframes(wobble, 'wobble')
        }
    }


    // const [list, setList] = useState([])
    const [value, setValue] = useState(null)
    const [showlist, setShowlist] = useState(true)
    const [editedId, seteditedId] = useState(null)
    const inputRef = useRef()


    //Functional Block Start

    useEffect(() => {
        document.title = "To Do Application"
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
        }
        link.href = favicon;
    }, []);


    const handelChange = (e) => {
        setValue(e.target.value.trim())
    }

    const handelClick = () => {
        seteditedId(null)
        if (value && value !== " ") {
            dispatch(addTask({
                id: `${Math.random()}.${value}`,
                title: value,
                isComplete: false
            }))

            // setList([value, ...list]);
            inputRef.current.value = "";
            inputRef.current.focus();
            setValue(null)
        }
    }
    const handelShow = () => {
        document.getElementById('list').style = 'animation: zoom-b 1.5s forwards ';
        // document.getElementById('nd').style.cssText = `position: unset`;
        
        setTimeout(() => {
            setShowlist(true);
        },1500)
        
    }
    const handelHide = () => {
        document.getElementById('list').style = 'animation: zoom-a 1.5s forwards '
        // document.getElementById('nd').style = `position: absolute;left: 270px;top: 0px;transition: transform 2s`;
                setTimeout(() => {
            setShowlist(false);
        },300)

    }
    const handelReset = () => {
        dispatch(ResetAllTask());
        // setList([]);

    }
    const handelCheck = (value, index) => {
        // document.getElementById('dumb').style.cssText = 'left:160px';
        // setTimeout(() => {
        // document.getElementById('dumb').style.cssText = 'left:270px';
            
        // }, 1000);
        dispatch(completeTask({
            id: value?.id,
            isComplete: true
        }));
    }
    const handelWrong = (value, index) => {
        dispatch(deleteTask({
            id: value?.id
        }));    

        
    }
    const handelUndo = (value, index) => {
        dispatch(completeTask({
            id: value?.id,
            isComplete: false
        }));
    }

    const handelEdit = (value, index) => {
        seteditedId(value?.id)
        setValue(value?.title)
        console.log(value, index);
    }
    const submitEditData = (value, id) => {
        console.log(value, id);
        dispatch(EditTask({ title: value, id: id }));
        seteditedId(null)
    }

    //Functional Block Ends

    return (
        <div className="Home pt-10">
             <div className="harry-img"> </div>
             <div className="school-img"> </div>
            <div className="dumb-img" id="dumb">
                {/* <img src={dumb} height="100%" width="100%" alt="not-found" /> */}
            </div>
            <div className="hogwarts-img">
                {/* <img src={image} height="100%" width="100%" alt="not-found"/> */}
            </div>
            

            <div className="todo-container mt-10 p-10">
                <div style={{zIndex: 99}}>
                    
                <div className="heading" >
                Task Application
            </div>
                <div className="input-container">
                    <div className="input-label p-10 story f-30 harry">
                        Task:-
                    </div>
                    <div  className="dfjc">

                    <input
                            className="input"
                            required
                        // value={value}
                        ref={inputRef}
                        onChange={(e) => {
                            handelChange(e);
                            
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handelClick(e)
                            }
                        }}
                        
                        />
                    <div className="btn ml-10" onClick={(e) => handelClick(e)} >  Add </div>
                        </div>

                    <div className="control-center dfjc mt-10 ">
                        <div className="btn" onClick={(e) => handelShow()}>Show</div>
                        <div className="btn" onClick={(e) => handelHide()}>Hide</div>
                        <div className="btn" onClick={(e) => handelReset()}>Reset</div>
                    </div>
       </div>

                    <div className="list mt-10" id="list">
                        <ul className="list-ul">
                            {
                                showlist && list.length > 0 ? list.map((item, index) => {
                                    return <div className="li-div" key={index} >

                                        <li  id={item?.title+index}>
                                            {
                                                item?.isComplete ?

                                                    <StyleRoot>
                                                        <div style={styles.wobble} className="arrow">
                                                            {/* <img src={arrow} height="100%" width="100%" alt="not-found" /> */}
                                                            <img src={"https://www.freeiconspng.com/uploads/tick-icon-30.png"} className="check-ctrl" height="100%" width="100%" alt="not-found" />
                                                        </div>
                                                    </StyleRoot>
                                                    : null
                                            }
                                            <div style={{ width: '100%' }} className={item?.isComplete ? 'lt line-through' : 'lt'}>
                                                {

                                                    editedId !== null && editedId === item.id ?
                                                        <div className="df">
                                                            <input type="text"
                                                                value={value}
                                                                className="edit-input"
                                                                autoFocus={true}
                                                                onChange={(e) => { handelChange(e) }}

                                                            />
                                                            <div className="edit-ok-btn" onClick={(e) => submitEditData(value, item?.id)}>Okay</div>
                                                        </div>
                                                        : item?.title
                                                }
                                            </div>
                                            {

                                                editedId !== item.id ?
                                                    <div className="df">

                                                        {
                                                            !item?.isComplete ?
                                                                <>
                                                                    <div className="control-img" title="Mark Completed"
                                                                        onClick={() => handelCheck(item, index)} >
                                                                        <img src={check} height="100%" width="100%" alt="not-found" />
                                                                    </div>
                                                                    <div className="control-img" title="Edit"
                                                                    onClick={() => handelEdit(item, index)} >
                                                                    <img src={pencil} height="100%" width="100%" alt="not-found" />
                                                                </div>
                                                                </>
                                                                : null
                                                        }

                                                        {
                                                            item?.isComplete ?
                                                                <div className="control-img" title="Mark Incompleted"
                                                                        onClick={() => handelUndo(item, index)}>
                                                                        <img src={undo} height="100%" width="100%" alt="not-found" />
                                                                    </div>
                                                                
                                                                : null}

                                                        <div className="control-img" title="Delete Task"
                                                            onClick={() => handelWrong(item, index,)}
                                                        ><img src={wrong} height="100%" width="100%" alt="not-found" />
                                                        </div>
                                                    </div> : null}




                                        </li>
                                    </div>
                                })

                                    :
                                    <div
                                        id="nd"
                                        className="no-data harry"
                                    >
                                        NO TODO'S
                                    </div>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
