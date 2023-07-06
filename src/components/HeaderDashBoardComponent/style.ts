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
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 8px 8px;
            margin-right: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;

            &:hover {
                background: #0056b3;
                    }
        }
        a{
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 8px 8px;
            margin-right: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;

            :hover{
                
                background: #0056b3;

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
