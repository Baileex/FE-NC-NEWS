import styled from "styled-components";

export const Card = styled.li`
         background-color: #fff;
         background: linear-gradient(#f8f8f8, #fff);
         box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.4);
         border-radius: 6px;
         display: grid;
         grid-template-columns: 666px 111px 111px 111px
         grid-auto-rows: 50px
         position: relative;
         margin-top: 15rem;
         margin: 1.5rem;
         width: 800px;
         margin-left: 30%      
         
         @media only screen and (max-width: 1024px) {
         width: 750px;
         grid-template-columns: 555px 111px 111px 111px
         grid-auto-rows: 50px
} 

         @media only screen and (max-width: 768px) {
         width: 475px;
         grid-template-columns: 200px 100px 100px 50px
         grid-auto-rows: 50px
}
         @media only screen and (max-width: 425px) {
         width: 300px;
         grid-template-columns: 100px 100px 100px 100px
         grid-auto-rows: 50px
}
        



       `;

export const Title = styled.h4`
         grid-column-start: 1
         grid-column-end: 1
 @media only screen and (max-width: 425px) {
           font-size: 18px
           grid-column-start: 1
         grid-column-end: 4
         }
         @media only screen and (max-width: 768px) {
           font-size: 25px
           grid-column-start: 1
           grid-column-end: 4
           margin-left: 1%;
         }
         @media only screen and (max-width: 320px) {
           font-size: 18px
         }
         @media only screen and (max-width: 375px) {
           font-size: 18px
         }
         @media only screen and (max-width: 425px) {
           font-size: 18px
         }
       `;

export const Topic = styled.p`
grid-column-start: 1
grid-column-end: 2
gird-row-start: 2
grid-row-end: 3
`;

export const Author = styled.h5`
grid-column-start: 1
grid-column-end: 2
gird-row-start: 4
grid-row-end: 5
@media only screen and (max-width: 425px) {
           font-size: 18px
           grid-column-start: 3
         grid-column-end: 4
         gird-row-start: 2
grid-row-end: 3
         }
`;

export const Date = styled.h5`
         grid-column-start: 1
grid-column-end: 2
gird-row-start: 3
grid-row-end: 4
 @media only screen and (max-width: 425px) {
           font-size: 14px
           grid-column-start: 3
           grid-column-end: 3
         }
       `;

export const Readmore = styled.h5`
grid-column-start: 1
grid-column-end: 2
gird-row-start: 5
grid-row-end: 6
`;

export const Commentcount = styled.h6`
grid-column-start: 2
grid-column-end: 3
gird-row-start: 5
grid-row-end: 6
@media only screen and (max-width: 425px) {
           font-size: 18px
           grid-column-start: 3
         grid-column-end: 4
         gird-row-start: 5
         grid-row-end: 6
         }
         @media only screen and (max-width: 320px) {
           font-size: 18px
           grid-column-start: 3
         grid-column-end: 4
         gird-row-start: 5
grid-row-end: 6

         }
`;

export const Votebox = styled.div`
grid-column-start: 2
  grid-column-end: 2
  grid-row-start: 2
  grid-row-end: 3
  justify-items: center;
  align-items: center
  width: 25%
  margin-left: auto;
    margin-right: auto 
`;

export const Votes = styled.div`
  color: #fff;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.15);
  padding: 0.125rem 0.25rem;
  border-radius: 100px;
  display: flex
  justify-content: center;
  margin-top: 10px
`;

export const Upvote = styled.button`
  border: solid black;
  border-width: 0 3px 3px 0;
  padding: 3px;
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  cursor: default;
  :active {
    border: solid yellow;
  }
  :hover {
    border: solid yellow;
  }
`;

export const Downvote = styled.button`
  border: solid black;
  border-width: 0 3px 3px 0;
  padding: 3px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  cursor: default;
  :active {
    border: solid yellow;
  }
  :hover {
    border: solid yellow;
  }
`;

export const ArticleList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  width: 2000px
  margin-left: -5%; 
  
  @media only screen and (max-width: 768px) {
  display: flex 
  width: 100px
  margin-left: 32%;
  margin-top: 10%;
}
  @media only screen and (max-width: 425px) {
  display: flex 
  width: 400px
  margin-left: -28%;
  margin-top: 2%;
}
 @media only screen and (max-width: 375px) {
  display: flex 
  width: 300px
  margin-left: -26%;
}
 @media only screen and (max-width: 320px) {
  display: flex 
  width: 300px
  margin-left: -10.75%;
}

`;
