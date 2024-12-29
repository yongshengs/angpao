import { angpao } from '../src/index';
import { describe, test, expect } from "@jest/globals";
import readline from 'readline';

// Mock readline
jest.mock('readline', () => ({
    createInterface: jest.fn().mockReturnValue({
        question: jest.fn(),
        close: jest.fn()
    })
}));

describe('angpao', () => {
    let consoleSpy: jest.SpyInstance;
    let rlInstance: any;

    // run before each test case
    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log');
        rlInstance = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    });

    // run after each test case
    afterEach(() => {
        consoleSpy.mockRestore();
        jest.clearAllMocks();
    });


    // test case 1 
    test('Test 1: valid inputs for Q1 and Q2 + allocate success', async () => {
        
        rlInstance.question.mockImplementationOnce((question: string, callback: Function) => {
            callback('50');
        })
        .mockImplementationOnce((question: string, callback: Function) => {
            callback('3');
        })

        await angpao();

        expect(consoleSpy).toHaveBeenCalledWith('Welcome to the Angpao Game! Type end at any time to end the game.');
        expect(consoleSpy).toHaveBeenCalledWith('Total money to share is: $50 \n');
        expect(consoleSpy).toHaveBeenCalledWith('Number of people to share with: 3 \n');
        expect(consoleSpy).toHaveBeenCalledWith('Here is the proposed allocation: \n');
        expect(rlInstance.close).toHaveBeenCalled();
    });

    // test case 2
    test('Test 2: Invalid input for Q1 + subsequent valid inputs + allocate success', async () => {
        rlInstance.question
            .mockImplementationOnce((question: string, callback: Function) => {
                callback('abc');
            })
            .mockImplementationOnce((question: string, callback: Function) => {
                callback('50');
            })
            .mockImplementationOnce((question: string, callback: Function) => {
                callback('3');
            });

        await angpao();

        expect(consoleSpy).toHaveBeenCalledWith('Welcome to the Angpao Game! Type end at any time to end the game.');
        expect(consoleSpy).toHaveBeenCalledWith('Please enter a valid number. \n');
        expect(consoleSpy).toHaveBeenCalledWith('Total money to share is: $50 \n');
        expect(consoleSpy).toHaveBeenCalledWith('Number of people to share with: 3 \n');
        expect(consoleSpy).toHaveBeenCalledWith('Here is the proposed allocation: \n');
        expect(rlInstance.close).toHaveBeenCalled();
    });


    // test case 3
    test('Test 3: Invalid input for Q2 + allocate success', async () => {
        rlInstance.question
            .mockImplementationOnce((question: string, callback: Function) => {
                callback('50');
            })
            .mockImplementationOnce((question: string, callback: Function) => {
                callback('abc');
            })
            .mockImplementationOnce((question: string, callback: Function) => {
                callback('3');
            });

        await angpao();

        expect(consoleSpy).toHaveBeenCalledWith('Welcome to the Angpao Game! Type end at any time to end the game.');
        expect(consoleSpy).toHaveBeenCalledWith('Total money to share is: $50 \n');
        expect(consoleSpy).toHaveBeenCalledWith('Number of people to share with: 3 \n');
        expect(consoleSpy).toHaveBeenCalledWith('Please enter a valid number. \n');
        expect(consoleSpy).toHaveBeenCalledWith('Here is the proposed allocation: \n');
        expect(rlInstance.close).toHaveBeenCalled();
    });

    // test case 4
    test('Test 4: Invalid input for both Q1 and Q2 + allocate success', async () => {
        rlInstance.question
            .mockImplementationOnce((question: string, callback: Function) => {
            callback('abc');
            })
            .mockImplementationOnce((question: string, callback: Function) => {
                callback('50');
            })
            .mockImplementationOnce((question: string, callback: Function) => {
                callback('abc');
            })
            .mockImplementationOnce((question: string, callback: Function) => {
                callback('3');
            });

        await angpao();

        expect(consoleSpy).toHaveBeenCalledWith('Welcome to the Angpao Game! Type end at any time to end the game.');
        expect(consoleSpy).toHaveBeenCalledWith('Please enter a valid number. \n');
        expect(consoleSpy).toHaveBeenCalledWith('Total money to share is: $50 \n');
        expect(consoleSpy).toHaveBeenCalledWith('Number of people to share with: 3 \n');
        expect(consoleSpy).toHaveBeenCalledWith('Please enter a valid number. \n');
        expect(consoleSpy).toHaveBeenCalledWith('Here is the proposed allocation: \n');
        expect(rlInstance.close).toHaveBeenCalled();
    });

    // test case 5
    test('Test 5: Terminate program upon user typing end', async () => {
        const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
            throw new Error('process.exit() was called');
        });

        rlInstance.question
            .mockImplementationOnce((question: string, callback: Function) => {
            callback('end');
            });
            

        await expect(angpao()).rejects.toThrow('process.exit() was called');

        expect(consoleSpy).toHaveBeenCalledWith('Welcome to the Angpao Game! Type end at any time to end the game.');
        expect(consoleSpy).toHaveBeenCalledWith('Program terminated.');
        expect(rlInstance.close).toHaveBeenCalled();

        mockExit.mockRestore();
    });

});