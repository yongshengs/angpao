import readline from 'readline';


// readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


export async function angpao(): Promise<void> {
    let angpao_amount_input: string;
    let num_ppl_input: string;

    let angpao_amount: number;
    let num_ppl: number;
    
    console.log('Welcome to the Angpao Game! Type end at any time to end the game.');
    
    // question 1
    while (true) {
        angpao_amount_input = await new Promise<string>((res) => {
            rl.question(`How much money do you want to share? Please key in a number. \n`, res);
        });

        if (angpao_amount_input.trim().toLowerCase() === 'end') {
            console.log('Program terminated.');
            rl.close();
            process.exit();
        }

        angpao_amount = Number(angpao_amount_input.trim());

        if (!isNaN(angpao_amount) && angpao_amount > 0) {
            console.log(`Total money to share is: $${angpao_amount_input} \n`);
            break;
        } 
        else 
        {
            console.log(`Please enter a valid number. \n`);
        }
    }

    // question 2
    while (true) {
        num_ppl_input = await new Promise<string>((res) => {
            rl.question(`How many people do you want to share it with? \n`, res);
        });

        if (num_ppl_input.trim().toLowerCase() === 'end') {
            console.log('Program terminated.');
            rl.close();
            process.exit();
        }

        num_ppl = Number(num_ppl_input.trim());

        if (!isNaN(num_ppl) && num_ppl > 0 && num_ppl % 1 === 0) {
            console.log(`Number of people to share with: ${num_ppl} \n`);
            
            // invoke the random allocation function once user provides valid input to Q2
            const result: number[] = allocate(angpao_amount, num_ppl);

            // print out allocation results
            console.log("Here is the proposed allocation: \n");
            result.forEach((amt, i) => {
                console.log(`Person ${i + 1} gets $${amt.toFixed(2)}`);
            });

            rl.close(); 
            return;

        } 
        else 
        {
            console.log(`Please enter a valid number. \n`);
        }
    }
}


// Random allocation function
function allocate(angpao_amount: number, num_ppl: number): number[] {

    let weightstotal = 0; 
    const weights: number[] = []; 
    const allocation: number[] = []; 

    // Generate random weights and compute total sum
    for (let i = 0; i < num_ppl; i++) {
        const wt = getRandomInt(1, 10) // arbitrarily defined min and max
        weightstotal += wt;
        weights.push(wt);
    }

    // Allocate money based on weights (until n-1th person)
    let allocated_total = 0;
    for (let j = 0; j < weights.length - 1; j++) {
        let amt = Number((weights[j] * angpao_amount / weightstotal).toFixed(2)); // round to 2 dp
        allocation.push(amt);
        allocated_total += amt;
    }

    // Allocate remainder amount to last person (to account for any rounding errors)
    let remainder = Number((angpao_amount - allocated_total).toFixed(2)); // round to 2 dp
    allocation.push(remainder)

    return allocation;
}


// returns a random number between min and max inclusive
function getRandomInt(min : number, max : number) {
    const minNum = Math.ceil(min);
    const maxNum = Math.floor(max);
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
}


if (require.main === module) {
    // This code only runs if the file is executed directly
    angpao();
}