import {
  ContextConfigDefault,
  RouteGenericInterface,
  FastifyInstance,
  FastifyPluginCallback,
  FastifyReply,
  FastifyRequest,
  FastifySchema,
  preHandlerHookHandler
} from 'fastify';

declare module 'fastify' {
  interface FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider> {
    auth(
      functions: fastifyAuth.FastifyAuthFunction[] | (fastifyAuth.FastifyAuthFunction | fastifyAuth.FastifyAuthFunction[])[],
      options?: {
        relation?: fastifyAuth.FastifyAuthRelation;
        run?: 'all';
      }
    ): preHandlerHookHandler<RawServer, RawRequest, RawReply, RouteGenericInterface, ContextConfigDefault, FastifySchema, TypeProvider, Logger>;
  }
}

type FastifyAuth = FastifyPluginCallback<fastifyAuth.FastifyAuthPluginOptions>

declare namespace fastifyAuth {
  export type FastifyAuthRelation = 'and' | 'or'

  export type FastifyAuthFunction = (
    this: FastifyInstance,
    request: FastifyRequest,
    reply: FastifyReply,
    done: (error?: Error) => void
  ) => void;

  /**
   * @link [`fastify-auth` options documentation](https://github.com/fastify/fastify-auth#options)
   */
  export interface FastifyAuthPluginOptions {
    /**
     * The default relation between the functions. It can be either `or` or `and`.
     *
     * @default 'or'
     */
    defaultRelation?: FastifyAuthRelation;
  }

  export const fastifyAuth: FastifyAuth
  export { fastifyAuth as default }
}

declare function fastifyAuth(...params: Parameters<FastifyAuth>): ReturnType<FastifyAuth>
export = fastifyAuth
