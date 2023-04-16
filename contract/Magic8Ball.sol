// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Magic8Ball
 * @dev Magic 8 Ball *
 */
contract Magic8Ball {

    string[20] answers = [
        "It is certain",
        "Reply hazy, try again",
        "Don't count on it",
        "It is decidedly so",
        "Ask again later",
        "My reply is no",
        "Without a doubt",
        "Better not tell you now",
        "My sources say no",
        "Yes definitely",
        "Cannot predict now",
        "Outlook not so good",
        "You may rely on it",
        "Concentrate and ask again",
        "Very doubtful",
        "As I see it, yes",
        "Most likely",
        "Outlook good",
        "Yes",
        "Signs point to yes"
    ];

    function askQuestion(string memory question)
        public
        view 
        returns(string memory)
    {
      uint256 salt = bytes(question).length;
      if (salt == 0) {
          return "You must ask a question to get an answer";
      }
      uint256 random = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, salt))) % answers.length;
      return answers[random]; 
    }
}