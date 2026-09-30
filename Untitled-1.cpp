#include <iostream>
#include <random>

int main() {
    std::random_device device;
    std::mt19937 generator(device());
    std::uniform_int_distribution<int> distribution(1, 100);

    const int secretNumber = distribution(generator);
    int guess = 0;
    int attempts = 0;

    std::cout << "Guess the number (1-100)!\n";

    while (guess != secretNumber) {
        std::cout << "Your guess: ";

        if (!(std::cin >> guess)) {
            std::cout << "Please enter a valid number.\n";
            return 1;
        }

        ++attempts;

        if (guess < secretNumber) {
            std::cout << "Too low! Try again.\n";
        } else if (guess > secretNumber) {
            std::cout << "Too high! Try again.\n";
        } else {
            std::cout << "You got it in " << attempts << " guesses!\n";
        }
    }

    return 0;
}
