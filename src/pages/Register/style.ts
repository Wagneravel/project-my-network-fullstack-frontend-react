import styled from "styled-components";

export const StyleComponentPageRegister = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
    /* width: 100vw; */
    height: 100vh;
    padding: 20px;

    @media (max-width: 700px){

        flex-direction: column;
        gap: 0;
        width: 100%;
        padding: 0;
    }



    section{
        width: 500px;
        height: 500px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        flex-direction: column;

        @media (max-width: 700px){
            width: 100%;
        }

        img{
            max-width: 250px;
        }

        div{
            
            display: flex;
            align-items: center;
            gap: 30px;
            border: 1px solid bisque;
            padding: 20px;
            margin-top: 10px;


            h5{
                max-width: 300px;
            }

        }

    }

    form{
        width: 500px;
        height: 500px;
        border: 1px solid bisque;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-radius: 8px;
        padding: 20px;

        @media (max-width: 700px){
            width: 100%;
            
        }
        
        a{
            text-decoration: none;
            color: black;
            font-size: small;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
        }

        input{
            width: 90%;
            height: 50px;
            border-radius: 8px;
            border: 1px solid black;
            padding-left: 10px;
        }

        button{
            width: 90%;
            height: 50px;
            border-radius: 8px;
            background-color: bisque;
            color: black;
            border: none;
        }

        div{
            width: 90%;
            display: flex;
            justify-content: space-between;
        }

    }

`    