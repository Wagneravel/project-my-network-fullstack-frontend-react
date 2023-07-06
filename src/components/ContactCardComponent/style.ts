import styled from "styled-components";



export const StyledList = styled.ul`

    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 900px;
    height: 100%;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    flex-wrap: wrap;
    gap: 20px;

         

    && > li{
        width: 250px;
        height: 200px;
        box-sizing: border-box;
        border: 2px solid black;
        border-radius: 8px;
        background-color: bisque;

        /* :hover{
            border: 1px solid green;
        } */
        


        section{
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            background-color: bisque;
            border-radius: 8px 8px 0 0;
        }

        img{
            max-width: 150px;
            max-height: 150px;
            box-sizing: border-box;
        }

        div{
            padding: 10px;
            display: flex;
            flex-direction: column;

            button{
                border: none;
                background-color: bisque;
                padding: 8px 20px;
                border-radius: 8px;

                :hover{
                    background-color: green;
                    color: white;
            
                }
            }

            h3{
                margin: 0;
            }
            h5{
                margin: 0;
            }
        }

    }

`

export const StyledDivList = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;


    && > div{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

`

export const StyledDivListw = styled.div`
    h1{
        display: flex;
    }
`

export const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ModalTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
`;

export const ModalButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin-right: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;

export const ModalForm = styled.form`
  margin-top: 16px;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ModalErrorMessage = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 8px;
`;