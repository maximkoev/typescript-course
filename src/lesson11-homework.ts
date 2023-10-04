class Users {
    // TODO: Add type for list property, remove `any` type annotation
    constructor(public list: TUsers) {
    }

    // TODO: Write method that returns array of users names in format "John, Smith" ("firstName, lastName")
    // TODO: Need to fix code to use this.list property data
    getUsersNames() {
        return this.list.map(user => {
            return `${user.firstName}, ${user.lastName}`
        });
    }

    // TODO: Write method that updates users age to current date (2023 year)
    // TODO: Need to fix code to use this.list property data
    // TODO: Need to not mutate this.list property, but return new array of users with updated age
    updateUsersAge(): TUsers {
        const currentDate = new Date(Date.now()).getFullYear();
        return this.list.map(user => {
            const bd = new Date(user.birthDate).getFullYear();
            const ra = currentDate - bd;
            if (user.age !== ra) {
                return {
                    ...user,
                    age: ra
                }
            }
            return user;
        })
    }

    // TODO: Implement method that returns users from Ukraine (phone number +380)
    // TODO: Use this.list property data
    getUsersFromUkraine(): TUsers {
        return this.list.filter(({phone}) => phone.startsWith('+380'));
    }

    // TODO: Implement method that returns postal codes grouped by state, using this.list user data
    getStatePostalCodes(): TPostalCodes[] {
        let postals: TPostalCodes[] = [];
        this.list.forEach(user => {
            const p = postals.find(p => p.name === user.address.state);
            if (!p) {
                postals.push({
                    name: user.address.state,
                    postalCodes: [user.address.postalCode]
                });
                return;
            }
            const isPCAdded = p.postalCodes.find(pc => pc === user.address.postalCode);
            if (isPCAdded) {
                return;
            } else {
                p.postalCodes.push(user.address.postalCode);
                return;
            }
        });
        return postals
    }

    getMediumWomenAge(): number {
        let count: number = 0;
        const avg = this.list.reduce((acc: TUser['age'], {gender, age}) => {
            if (gender === 'female') {
                count++;
                acc = acc + age
            }
            return acc;
        }, 0) / count;
        return Number.parseFloat(avg.toFixed(2));
    }

    getMostCommonWoomanHairColor(): TUser['hair']["color"] {
        const woman: { color: TUser['hair']["color"], count: number }[] = [];
        this.list.forEach(user => {
            if (user.gender === 'female') {
                const hairExist = woman.find(w => w.color === user.hair.color);
                if (hairExist) {
                    hairExist.count++
                } else {
                    woman.push({color: user.hair.color, count: 1})
                }
            }
        });
        if (woman.length === 0) {
            throw new Error('No women in the list')
        }
        let max = 0;
        woman.forEach(w => {
            if (w.count > max) {
                max = w.count
            }
        });

        const mostCommonHair = woman.find(w => w.count === max);
        if (!mostCommonHair) {
            throw new Error('Color is undefined')
        }
        return mostCommonHair.color
    }

    getMostCommonManBlodType(): TUser["bloodGroup"] {
        const men: { bloodGroup: TUser["bloodGroup"], count: number }[] = [];
        this.list.forEach(user => {
            if (user.gender === 'male') {
                const groupExist = men.find(m => m.bloodGroup === user.bloodGroup);
                if (groupExist) {
                    groupExist.count++
                } else {
                    men.push({bloodGroup: user.bloodGroup, count: 1})
                }
            }
        });
        if (men.length === 0) {
            throw new Error('No men in the list')
        }
        let max = 0;
        men.forEach(m => {
            if (m.count > max) {
                max = m.count
            }
        });

        const mostCommonGroup = men.find(w => w.count === max);
        if (!mostCommonGroup) {
            throw new Error('Color is undefined')
        }
        return mostCommonGroup.bloodGroup
    }
}

type TPostalCodes = {
    name: Required<TUser>['address']['state'],
    postalCodes: Required<Array<TUser['address']['postalCode']>>

}

