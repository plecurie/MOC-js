const expect = require('expect.js');

describe('Excelsior', () => {
    const sut                   = require('./excelsior');
    const simple_order          = JSON.stringify(require('./simple_order.json'));
    const complex_order         = JSON.stringify(require('./complex_order.json'));
    const very_complex_order    = JSON.stringify(require('./very_complex_order.json'));
    const invalid_order = `{
        "damage": "10"
        "speed": "3.55"
        "spells": ["fireball", "haste"]
    }`;

    describe('when an invalid order is made', () => {
        let weapon = sut(invalid_order);
        it('should return an empty weapon', () => {
            expect(weapon.damage).to.be(undefined);
            expect(weapon.speed).to.be(undefined);
            expect(weapon.spells).to.be.an(Array);
            expect(weapon.spells.length).to.be(0);
        });
    });

    describe('when a simple order is made', () => {
        const weapon = sut(simple_order);

       it('should craft a weapon with the proper damage', () => {
           expect(weapon.damage).to.be(10);
       });

        it('should craft a weapon with the proper speed', () => {
            expect(weapon.speed).to.be(3.55);
        });

        it('should craft a weapon with the proper spells', () => {
            expect(weapon.spells).to.be.an(Array);
            expect(weapon.spells.length).to.be(2);
        });
    });

    describe('when a complex oder is made, with more than one triggering spell', () => {
        const weapon = sut(complex_order);

        it('should craft a weapon with the proper spells', () => {
            expect(weapon.spells).to.be.an(Array);
            expect(weapon.spells.length).to.be(1);


            const spell_1 = weapon.spells[0];
            expect(spell_1.spell).to.be('cold_weaknesses');
            expect(spell_1.trigger).to.eql({spell: 'frozen_ground ice_bolt added_cold_damage'});
        });
    });

    describe('when a very complex order is made, with multiple combined/nested triggering spells', () => {
        let weapon = sut(very_complex_order);

        it('should craft a weapon with the proper spells', () => {
            expect(weapon.spells).to.be.an(Array);
            expect(weapon.spells.length).to.be(3);


            const spell_1 = weapon.spells[0];
            expect(spell_1.spell).to.be('cast_on_critical_strike');
            expect(spell_1.trigger).to.eql({spell: 'stun'});

            const spell_2 = weapon.spells[1];
            expect(spell_2.spell).to.be('haste');

            const spell_3 = weapon.spells[2];
            expect(spell_3.spell).to.be('cast_on_hit');

            const trigger = spell_3.trigger;
            expect(trigger).to.be.an(Object);
            expect(trigger.spell).to.be('vulnerability');
            expect(trigger.trigger).to.eql({spell: 'cast_on_curse', trigger: { spell: 'ignite burning_ground'}});
        });
    });
});
