import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Logoo from '../../../assets/veewWhiteLogo.png'

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 40vh;
  position: relative;
`;

const StyledCard = styled(motion.div)<{ bgColor: string }>`
  width: 300px;
  height: 180px;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  position: absolute;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
`;

const Logo = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const Amount = styled.div`
  font-size: 28px;
  font-weight: bold;
  cursor:pointer;
  color: #ffffffcc;
`;

const cardVariants = {
  hidden: { x: '-100vw', opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.3, duration: 0.8, type: 'spring' },
  }),
};


interface walletProps {
  balanceAmount:number
}
const WalletCards: React.FC<walletProps> = ({balanceAmount}) => {
  return (
    <CardContainer>
      <StyledCard
        custom={2}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        bgColor="#FF6B6B"
        style={{ right: '20px', zIndex: 1 }}
      >
        <Logo><img src={Logoo} alt=""  className='w-24'/></Logo>
        <Amount>₹ {balanceAmount}</Amount>
      </StyledCard>

      <StyledCard
        custom={1}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        bgColor="#4ECDC4"
        style={{ right: '40px', zIndex: 0 }}
      >
        <img src={Logoo} alt=""  className='w-32'/>
      </StyledCard>

      <StyledCard
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        bgColor="#1A535C"
        style={{ right: '60px', zIndex: -1 }}
      >
        <img src={Logoo} alt=""  className='w-32'/>
      </StyledCard>
    </CardContainer>
  );
};

export default WalletCards;
