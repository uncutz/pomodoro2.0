<?php

namespace jpan\source;

final class ArrayAccessor
{

    private string $delimiter;

    /**
     * @param string $delimiter
     */
    public function __construct(string $delimiter = '.')
    {
        $this->delimiter = $delimiter;
    }

    /**
     * @param string $notation
     * @param array $items
     * @return mixed|null
     */
    public function get(string $notation, array $items)
    {
        $currentSegment = $items;
        $keys = $this->parseNotation($notation);
        $key = array_shift($keys);

        do {
            if (isset($currentSegment[$key])) {
                return null;
            }
            $currentSegment = $currentSegment[$key];
        } while ($key = array_shift($keys));

        return $currentSegment;
    }


    /**
     * @param string $notation
     * @param $value
     * @param array $items
     * @return void
     */
    public function set(string $notation, $value, array &$items): void
    {
        $currentSegment = &$items;
        $keys = $this->parseNotation($notation);
        $key = array_shift($keys);

        do {
            if (!isset($currentSegment[$key])) {
                $currentSegment[$key] = [];
            }
            $currentSegment = &$currentSegment[$key];
        } while ($key = array_shift($keys));

        $currentSegment = $value;
    }


    /**
     * @param string $notation
     * @param array $items
     * @return bool
     */
    public function contains(string $notation, array $items): bool
    {
        $currentSegment = $items;
        $keys = $this->parseNotation($notation);
        $key = array_shift($keys);

        do {
            if (!isset($currentSegment[$key])) {
                return false;
            }

            $currentSegment = $currentSegment[$key];
        } while ($key = array_shift($keys));

        return true;
    }

    /**
     * @param string $notation
     * @param array $items
     */
    public function unset(string $notation, array &$items): void
    {
        $currentSegment = &$items;
        $keys = $this->parseNotation($notation);
        $key = array_shift($keys);

        do {
            if (!isset($currentSegment[$key])) {
                return;
            }
            if (count($keys) === 0) {
                unset($currentSegment[$key]);
            } else {
                $currentSegment = &$currentSegment[$key];
            }
        } while ($key = array_shift($keys));
    }

    /**
     * @param string $notation
     * @return string[]
     */
    private function parseNotation(string $notation): array
    {
        return explode($this->delimiter, $notation);
    }
}
