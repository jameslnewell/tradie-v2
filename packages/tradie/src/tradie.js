#!/usr/bin/env node
import path from 'path';
import chalk from 'chalk';
import yargs from 'yargs';
import Template from './Template';

Template.find()
  .then(template =>
    template.getScripts().then(scripts =>
      scripts.describe(yargs).then(() => {
        //configure the arguments
        yargs
          .help()
          .exitProcess()
          .strict()
          .usage('Usage: tradie <command> [options]')
          .demandCommand(
            1,
            "run 'tradie help' for a list of available commands"
          );

        //parse the arguments
        const args = yargs.argv;

        //get the options
        const scriptName = args._[0];
        const scriptOptions = Object.assign({}, args, {
          root: path.resolve(process.cwd()),
          debug: Boolean(process.env.DEBUG)
        });

        //run the relevant script
        return template
          .getConfig(scriptName, scriptOptions)
          .then(config => scripts.run(scriptName, config));
      })
    )
  )
  .catch(error => {
    if (error) {
      if (error instanceof Error) {
        console.error(chalk.red(error.stack)); //eslint-disable-line no-console
      } else {
        console.error(chalk.red(error)); //eslint-disable-line no-console
      }
    }
    process.exit(1);
  });
