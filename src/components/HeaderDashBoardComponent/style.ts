import styled from "styled-components";

interface iStyleHeaderProps {
    
}

export const StyledHeader = styled.div<iStyleHeaderProps>`

    display: flex;
    align-items: center;
    justify-content: space-between; 
    width: 900px;
    min-height: 60px;

    @media (max-width: 700px){

        flex-direction: column;
        margin-top: 40px;
        width: 100%;
        gap:20px;
    }

    img{
        width: 190px;
    }
   

    div{
        display: flex;
        gap: 20px;

        div-user{
        display: flex;
        flex-direction: column;
        }

        button{
            border: none;
            background-color: bisque;
            padding: 8px 20px;
            border-radius: 8px;

            :hover{
                
                background-color: gray;
                color: white;
            }
        }

        a{
            text-decoration: none;
            padding: 8px 20px;
            background-color: bisque;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: black;

            :hover{
                
                background-color: gray;
                color: white;
            }

        }
    }

`

export const StyledHeaderDiv = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid bisque;
    margin-bottom: 40px;


    
`

