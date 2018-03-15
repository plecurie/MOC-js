module.exports = data => {

    /*
    MOVE CODE FROM `CONTROLLERS` TO `TEST` DIRECTORY
    Note: I haven't seen that there is a dedicated test suite for this exercise ^^'
    */
   
    try {
        data = JSON.parse(data);
    } catch (error) {
        return {
            damage: undefined,
            speed: undefined,
            spells: []
        };
    }

    data.damage = parseInt(data.damage);
    data.speed = parseFloat(data.speed);

    data.spells = data.spells.map(spell => {

        if (typeof spell === 'object') {
            let trigger = {};

            addTrigger(spell, trigger);

            function addTrigger(obj, trigger) {
                if (typeof obj[Object.keys(obj)] === 'object' && !Array.isArray(obj[Object.keys(obj)])) {
                    trigger.trigger = { spell: Object.keys(obj)[0] };
                    return addTrigger(obj[Object.keys(obj)], trigger.trigger);
                } 

                trigger.trigger = {
                    spell: Object.keys(obj)[0],
                    trigger: {
                        spell: obj[Object.keys(obj)].reduce((acc, cur) => acc + ' ' + cur)
                    }
                }

                return trigger;
            }

            return trigger[Object.keys(trigger)];
        }

        return { spell: spell };
    });

    return data;
}
