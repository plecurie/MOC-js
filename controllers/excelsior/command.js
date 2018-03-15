module.exports = server => {
    // DON'T FORGET TO UPDATE SETTINGS.JSON WITH YOUR MONGODB
    
    return (req, res) => {
        const data = req.body;

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

        res.json(data);
    }
};
