import styled, { createGlobalStyle } from "styled-components";
import Link from 'next/link';

const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
  background-color: #F4EFFA;
  display: block;
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  padding: 3rem 5rem 0;
  font-family: Verdana, sans-serif;
  max-width: 800px;
  margin: 0 auto;
}

a {
  color: inherit;
  text-decoration: none;
}
`;

const Header = styled.div`
  text-align: center;
  font-size: 30px;
  width: 100%;
  margin-bottom: 20px;
  cursor: pointer;
`;


const App = ({ Component, pageProps }: any) => {
    return (
        <>
            <GlobalStyle />
            <Link href={{pathname: '/'}}>
                <Header>
                    Vsechno a nic
                </Header>
            </Link>
            <Component {...pageProps} />
        </>
    );
};

export default App;

