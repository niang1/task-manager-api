let array1 = {
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
};

array1 = {
  tokens: [
    {
      token: "token 1",
    },
    {
      token: "token 2",
    },
  ],
};

//array1.find((element)=>)
//console.log(array1.tokens.token);
console.log("array_tokens", array1.tokens);
console.log(array1.tokens.find((element) => element.token === "token 2"));
