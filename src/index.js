const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRILIDADE: 3,
    PODER: 3,
    PONTOS: 0
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRILIDADE: 4,
    PODER: 4,
    PONTOS: 0
};

async function rollDice(){
  return Math.floor( Math.random() * 6) + 1;
}

async function getRndomBlocks() {
    let random = Math.random();
    let result;
    
    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }
    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2){
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`);

        // sortear bloco
        let block = await getRndomBlocks();
        console.log(`Bloco: ${block}`);

        // rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // teste de habilidade
        let totaltestSkill1 = 0;
        let totaltestSkill2 = 0;

        if(block === "RETA"){
            totaltestSkill1 = diceResult1 + character1.VELOCIDADE;
            totaltestSkill2 = diceResult2 + character2.VELOCIDADE;
        
            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
        }

        if(block === "CURVA"){
            totaltestSkill1 = diceResult1 + character1.MANOBRILIDADE;
            totaltestSkill2 = diceResult2 + character2.MANOBRILIDADE;

            await logRollResult(character1.NOME, "manobrilidade", diceResult1, character1.MANOBRILIDADE);
            await logRollResult(character2.NOME, "manobrilidade", diceResult2, character2.MANOBRILIDADE);
        }
        
        if(block === "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} confrontou ${character2.NOME} 🥊!`);

            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

            if(powerResult1 > powerResult2 && character2.PONTOS > 0){
                console.log(`${character1.NOME} venceu e ${character2.NOME} perdeu um ponto! 🐢 `);
                character2.PONTOS--;
            }

            if(powerResult2 > powerResult1 && character1.PONTOS > 0){
                console.log(`${character2.NOME} venceu e ${character1.NOME} perdeu um ponto! 🐢 `)
                character1.PONTOS--;
            }

            console.log(powerResult1 === powerResult2 ? "Empate! Nenhum ponto perdido!": "");
            
        }
    


        if (totaltestSkill1 > totaltestSkill2){
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        } else if(totaltestSkill2 > totaltestSkill1){
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        }

        console.log('------------------------------');
    }
}

async function declareWinner(character1, character2){
    console.log("Resultado final:")
    console.log(`${character1.NOME} - ${character1.PONTOS} pontos`);
    console.log(`${character2.NOME} - ${character2.PONTOS} pontos`);

    if(character1.PONTOS > character2.PONTOS){
        console.log(`\n ${character1.NOME} venceu! 🏆`);
    } else if(character2.PONTOS > character1.PONTOS){
        console.log(`\n ${character2.NOME} venceu! 🏆`);
    }
    else {
        console.log(`\n Empate!`);
    }
}

(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`);
    
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();


